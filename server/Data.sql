DROP DATABASE IF EXISTS bakery;
CREATE DATABASE bakery;

USE bakery;

SET SQL_SAFE_UPDATES=0;

-- DROP TABLE Customer;

CREATE TABLE Customer(
    ID                INT UNSIGNED NOT NULL AUTO_INCREMENT,
    CustomerName      VARCHAR(30) NOT NULL,
    WeChatID          VARCHAR(20) NOT NULL,
    phoneNumber       VARCHAR(20),
    joinDate          DATETIME NOT NULL,
    addressOne        VARCHAR(30) NOT NULL,
    addressTwo        VARCHAR(30),
    city              VARCHAR(20),
    zip               VARCHAR(10),
    Comment           VARCHAR(1024),
    PRIMARY KEY (ID)
)Engine=InnoDB;



-- DROP TABLE `Order`;

CREATE TABLE `Order`(
    ID                INT UNSIGNED NOT NULL AUTO_INCREMENT,
    Customer_ID       INT UNSIGNED NOT NULL,
    DatePlaced        DATETIME NOT NULL,
    PickupTime        DATETIME NOT NULL,
    Fulfilled         INT NOT NULL,
    Comment           VARCHAR(2048),
    Amount            DECIMAL(8,2) NOT NULL,
    PRIMARY KEY (ID),
    FOREIGN KEY (Customer_ID) REFERENCES Customer(ID) 
        ON DELETE CASCADE
        ON UPDATE CASCADE
    
)Engine=InnoDB;



-- DROP TABLE Payment_Type;

CREATE TABLE Payment_Type(
    ID                INT UNSIGNED NOT NULL AUTO_INCREMENT,
    Type              VARCHAR(16) NOT NULL,
    PRIMARY KEY (ID)
)Engine=InnoDB;

INSERT INTO Payment_Type(Type)
    VALUES 
    ("Cash"),
    ("WeChat"),
    ("Reward Points");

-- DROP TABLE Payment;

CREATE TABLE Payment(
    order_id          INT UNSIGNED NOT NULL,
    Payment_Type_ID   INT UNSIGNED NOT NULL,
    Amount            DECIMAL(8,2) NOT NULL,
    PRIMARY KEY (order_id, Payment_Type_ID),
    FOREIGN KEY (order_id) REFERENCES `Order`(ID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (Payment_Type_ID) REFERENCES Payment_Type(ID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
)Engine=InnoDB;


-- DROP TABLE Product;

CREATE TABLE Product(
    ID                INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `Name`            VARCHAR(30) NOT NULL,
    Price             DECIMAL(6,2) NOT NULL,
    FoodCost          DECIMAL(6,2),
    TimeCost          INT,
    Comment           VARCHAR(1024),
    PRIMARY KEY(ID)
)Engine=InnoDB;



-- DROP TABLE Order_Details;

CREATE TABLE Order_Details(
    order_id          INT UNSIGNED NOT NULL,
    product_id        INT UNSIGNED NOT NULL,
    PriceAtSale       DECIMAL(6,2) UNSIGNED NOT NULL,
    FoodCostAtSale    DECIMAL(6,2) UNSIGNED NOT NULL,
    Quantity          INT NOT NULL,
    Comment           VARCHAR(1024),
    PRIMARY KEY (order_id, product_id),
    FOREIGN KEY (order_id) REFERENCES `Order`(ID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (product_id) REFERENCES Product(ID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
)Engine=InnoDB;



-- DROP TABLE Sales_Report;

CREATE TABLE Sales_Report(
    ID                INT UNSIGNED NOT NULL AUTO_INCREMENT,
    Date              DATE NOT NULL UNIQUE,
    Hours             INT,
    Comment           VARCHAR(8048),
    PRIMARY KEY (ID)
)Engine=InnoDB;

-- DROP TABLE Sales_Report_Details;

CREATE TABLE Sales_Report_Details(
    Sales_Report_ID   INT UNSIGNED NOT NULL,
    product_id        INT UNSIGNED NOT NULL,
    StartQuantity     INT NOT NULL,
    QuantitySold      INT NOT NULL,
    QuantityTrashed   INT NOT NULL,
    PriceAtSale       DECIMAL(6,2) NOT NULL,
    FoodCostAtSale    DECIMAL(6,2) NOT NULL,
    PRIMARY KEY (Sales_Report_ID, product_id),
    FOREIGN KEY (Sales_Report_ID) REFERENCES Sales_Report(ID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (product_id) REFERENCES Product(ID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
)Engine=InnoDB;



-- DROP TABLE Recipe;

CREATE TABLE Recipe(
    product_id        INT UNSIGNED NOT NULL,
    Comment           VARCHAR(10000),
    PRIMARY KEY (product_id),
    FOREIGN KEY (product_id) REFERENCES Product(ID)
        ON DELETE CASCADE
        ON UPDATE CASCADE

)Engine=InnoDB;


-- DROP TABLE Ingredient;

CREATE TABLE Ingredient(
    ID                INT UNSIGNED NOT NULL AUTO_INCREMENT,
    Name              VARCHAR(50),
    PricePerKG        DECIMAL(8,2),
    Note              VARCHAR(512),
    PRIMARY KEY(ID)
)Engine=InnoDB;



-- DROP TABLE Recipe_Ingredient;

CREATE TABLE Recipe_Ingredient(
    Recipe_ID         INT UNSIGNED NOT NULL,
    Ingredient_ID     INT UNSIGNED NOT NULL,
    Grams             INT UNSIGNED NOT NULL,
    PRIMARY KEY (Recipe_ID, Ingredient_ID),
    FOREIGN KEY (Recipe_ID) REFERENCES Recipe(product_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (Ingredient_ID) REFERENCES Ingredient(ID)
        ON DELETE CASCADE
        ON UPDATE CASCADE

)Engine=InnoDB;




DELIMITER &&
CREATE PROCEDURE fetch_orders_in_range(IN startDate DATE, IN endDate DATE, IN keyWord VARCHAR(52))
BEGIN
		SELECT
			o.ID as order_id, Customer_ID, CustomerName, DatePlaced, PickupTime, Fulfilled, o.Comment
		FROM `Order` o
		JOIN Customer c ON c.ID = o.Customer_ID
        WHERE DatePlaced >= startDate AND DatePlaced <= endDate AND (CustomerName LIKE CONCAT('%', keyWord, '%') OR o.Comment LIKE CONCAT('%',keyWord,'%'))
        ORDER BY DatePlaced DESC;
END &&

DELIMITER &&
CREATE PROCEDURE fetch_all_sales_in_range(IN startDate DATE, IN endDate DATE)
BEGIN
		SELECT *
		FROM Sales_Report sp
        WHERE sp.Date >= startDate AND sp.Date <= endDate 
        ORDER BY sp.Date DESC;
END &&

DELIMITER &&
CREATE PROCEDURE fetch_sales_in_range(IN startDate DATE, IN endDate DATE)
BEGIN
        SELECT 
            s.ID as report_id, 
            s.Date,
            s.Comment,
            s.Hours, 
            sum(QuantitySold * ( PriceAtSale - FoodCostAtSale) - QuantityTrashed * FoodCostAtSale) as profit, 
            sum(QuantitySold * PriceAtSale) as revenue
		FROM Sales_Report s
		JOIN Sales_Report_Details spd  ON Sales_Report_ID = s.ID
		JOIN Product p ON product_id = p.ID
        WHERE DatePlaced >= startDate AND DatePlaced <= endDate
		GROUP BY report_id, Date
		ORDER BY Date DESC;
END &&

DELIMITER &&
CREATE PROCEDURE fetch_customers_keyword(IN keyWord VARCHAR(52))
BEGIN
		SELECT *
		FROM Customer c
        WHERE CustomerName LIKE CONCAT('%', keyWord, '%') 
        OR WeChatID LIKE CONCAT('%',keyWord,'%') 
        OR phoneNumber LIKE CONCAT('%',keyWord,'%') 
        OR addressOne LIKE CONCAT('%',keyWord,'%') 
        ORDER BY joinDate DESC;
END &&

DELIMITER &&
CREATE PROCEDURE fetch_ingredients_keyword(IN keyWord VARCHAR(52))
BEGIN
		SELECT *
		FROM Ingredient i
        WHERE i.Name LIKE CONCAT('%', keyWord, '%') 
        OR i.PricePerKG LIKE CONCAT('%',keyWord,'%') 
        OR i.Note LIKE CONCAT('%',keyWord,'%');
END &&

DELIMITER &&
CREATE PROCEDURE fetch_products_keyword(IN keyWord VARCHAR(52))
BEGIN
		SELECT *
        FROM Product p
        WHERE p.Name LIKE CONCAT('%', keyWord, '%') 
        OR p.Comment LIKE CONCAT('%',keyWord,'%');
END &&

DELIMITER &&
CREATE PROCEDURE fetch_all_orders()
BEGIN
		SELECT
			o.ID as order_id, Customer_ID, CustomerName, DatePlaced, PickupTime, Fulfilled, o.Comment
		FROM `Order` o
		JOIN Customer c ON c.ID = o.Customer_ID
		ORDER BY PickupTime;
END &&

CREATE PROCEDURE fetch_select_orders_in_range(IN bool INT, IN startDate DATE, in endDate DATE)
BEGIN
		SELECT
			o.ID as order_id, Customer_ID, Username, DatePlaced, PickupTime, Fulfilled, o.Comment
		FROM `Order` o
		JOIN Customer c ON c.ID = o.Customer_ID
        WHERE Fulfilled = bool AND DatePlaced >= startDate AND DatePlaced <= endDate
		ORDER BY PickupTime;
END &&

CREATE PROCEDURE fetch_single_order(IN id INT)
BEGIN
    SELECT
        o.ID as order_id, Customer_ID, CustomerName, DatePlaced, PickupTime, Fulfilled, o.Comment,o.Amount,CONCAT(c.addressOne," ",c.addressTwo) AS location
    FROM `Order` o
    JOIN Customer c ON c.ID = o.Customer_ID
    WHERE o.ID = id;
END &&

CREATE PROCEDURE fetch_single_order_details(IN id INT)
BEGIN
    SELECT
        product_id, Name, PriceAtSale, Quantity, od.Comment , (PriceAtSale * Quantity) AS Total
    FROM Order_Details od
    JOIN `Order` o ON o.ID = od.order_id
    JOIN Product p ON p.ID = od.product_id
    WHERE order_id = id
    ORDER BY Name;
END &&

CREATE PROCEDURE fetch_single_order_payments(IN id INT)
BEGIN
    SELECT
        pt.ID,Type, pm.Amount
    FROM Payment pm
    JOIN `Order` o ON o.ID = pm.order_id
    JOIN Payment_Type pt ON pt.ID = pm.Payment_Type_ID
    WHERE order_id = id
    ORDER BY Type;
END &&

CREATE PROCEDURE fetch_single_order_detail(IN o_id INT, IN p_id INT)
BEGIN
    SELECT
        product_id, Name, PriceAtSale, Quantity, od.Comment , (PriceAtSale * Quantity) AS Total
    FROM Order_Details od
    JOIN `Order` o ON o.ID = od.order_id
    JOIN Product p ON p.ID = od.product_id
    WHERE order_id = o_id AND product_id = p_id; 
END &&

CREATE PROCEDURE fetch_single_payment(IN id INT)
BEGIN
    SELECT
        order_id, Amount, Type
    FROM payment p
    JOIN Payment_Type pt ON pt.ID = p.Payment_Type_ID 
    WHERE order_id = id;
END &&

CREATE PROCEDURE fetch_customer_orders(IN cust_id INT)
BEGIN
	SELECT 
		o.ID, DatePlaced, Fulfilled, o.Comment, SUM(Quantity * Price) as Total
	FROM `Order` o
    JOIN Order_Details od ON od.order_id = o.ID
    JOIN Product p on p.ID = od.product_id
    WHERE Customer_ID = cust_id
    GROUP BY order_id;
END &&

CREATE PROCEDURE fetch_customer_favorites(IN cust_id INT)
BEGIN
SELECT
	c.ID as id,
	p.Name as name,
	SUM(od.Quantity) as total
		FROM bakery.Customer c
			JOIN bakery.`Order` o ON c.ID = o.Customer_ID
			JOIN bakery.Order_Details od ON o.ID = od.order_id
			JOIN bakery.Product p ON od.product_id = p.ID
		WHERE c.ID = cust_id
		GROUP BY
			c.ID, p.Name
		ORDER BY total DESC
        limit 7;
END &&

CREATE PROCEDURE fetch_customer_points(IN cust_id INT)
BEGIN
SELECT min(ID) as ID, sum(total) as total
    FROM(
        SELECT pt.ID ,sum(p.Amount) as total
        From bakery.Customer c
            JOIN bakery.`Order` o ON o.Customer_ID = c.ID
            JOIN bakery.Payment p ON p.order_id = o.ID
            JOIN bakery.Payment_Type pt ON pt.ID = p.Payment_Type_ID
            WHERE c.ID = cust_id
            GROUP BY pt.ID) as T
GROUP BY (case when ID in (1,2) then 1 else ID end);
END &&

CREATE PROCEDURE fetch_customer_info(IN cust_id INT)
BEGIN
	SELECT *
    FROM Customer
    WHERE ID = cust_id;
END &&

CREATE PROCEDURE fetch_ingredient_info(IN Ingredient_ID INT)
BEGIN
	SELECT *
    FROM Ingredient
    WHERE ID = Ingredient_ID;
END &&

CREATE PROCEDURE fetch_ingredient_products(IN ing_id INT)
BEGIN
SELECT p.ID, p.Name, p.price, p.FoodCost, p.TimeCost, ri.grams
FROM Product p
JOIN Recipe r ON r.product_id = p.ID 
JOIN Recipe_Ingredient ri ON ri.Recipe_ID = r.product_id
JOIN Ingredient i ON i.ID = ri.Ingredient_ID
WHERE i.ID = ing_id; 
END &&

CREATE PROCEDURE fetch_product_foodcost(IN prod_id INT)
BEGIN
	SELECT 
		sum(round(((i.PricePerKG * ri.Grams) / r.ItemsProduced) / 1000, 2)) as FoodCost
	FROM Product p
		JOIN Recipe r ON r.product_id = p.ID
		JOIN Recipe_Ingredient ri ON ri.Recipe_ID = r.product_id
		JOIN Ingredient i ON i.ID = ri.Ingredient_ID
	WHERE r.product_id = prod_id;
END &&

CREATE PROCEDURE fetch_product_recipe(IN prod_id INT)
BEGIN
	SELECT i.ID, i.Name, i.PricePerKG, ri.grams
    FROM Recipe r
    JOIN Recipe_Ingredient ri ON ri.Recipe_ID = r.product_id
    JOIN Ingredient i ON i.ID = ri.Ingredient_ID
    WHERE r.product_id = prod_id;
END &&

CREATE PROCEDURE fetch_product_quantity(IN prod_id INT)
BEGIN
SELECT
	p.Name as name,
	SUM(od.Quantity) as total
		FROM bakery.Product p
			JOIN bakery.Order_Details od ON p.ID = od.product_id
            JOIN bakery.`Order` o ON o.ID = od.order_id
		WHERE p.ID = prod_id
		GROUP BY
			p.Name;
END &&

CREATE PROCEDURE fetch_product_quantity_sale(IN prod_id INT)
BEGIN
SELECT
	p.Name as name,
	SUM(spd.QuantitySold) as total
		FROM bakery.Product p
			JOIN Sales_Report_Details spd ON spd.product_id= p.ID
		WHERE p.ID = prod_id
		GROUP BY
			p.Name;
END &&

CREATE PROCEDURE fetch_product_quantity_Keyword(IN keyWord VARCHAR(52))
BEGIN
SELECT 
    p.ID,
	p.Name as name,
	SUM(od.Quantity) as total
		FROM bakery.Product p
			JOIN bakery.Order_Details od ON p.ID = od.product_id
            JOIN bakery.`Order` o ON o.ID = od.order_id
		WHERE p.Name LIKE CONCAT('%', keyWord, '%') 
            OR p.Comment LIKE CONCAT('%',keyWord,'%')
		GROUP BY
			p.Name,p.ID;
END &&

CREATE PROCEDURE fetch_product_top_customer(IN prod_id INT)
BEGIN
SELECT
	c.CustomerName,
	SUM(od.Quantity) as total
		FROM bakery.Customer c
			JOIN bakery.`Order` o ON c.ID = o.Customer_ID
			JOIN bakery.Order_Details od ON o.ID = od.order_id
			JOIN bakery.Product p ON od.product_id = p.ID
		WHERE p.ID = prod_id
		GROUP BY
			c.CustomerName
		ORDER BY total DESC
        limit 7;
END &&

CREATE PROCEDURE fetch_product_orders(IN prod_id INT)
BEGIN
SELECT
    o.ID,
    o.PickupTime,
    o.Amount,
    o.Comment,
    o.Fulfilled
		FROM bakery.`Order` o
			JOIN bakery.Order_Details od ON o.ID = od.order_id
			JOIN bakery.Product p ON od.product_id = p.ID
		WHERE p.ID = prod_id
        ORDER BY PickupTime;
END &&

CREATE PROCEDURE fetch_all_sales()
BEGIN
    SELECT 
            s.ID as report_id, 
            s.Date,
            s.Comment,
            s.Hours, 
            sum(QuantitySold * ( PriceAtSale - FoodCostAtSale) - QuantityTrashed * FoodCostAtSale) as profit, 
            sum(QuantitySold * PriceAtSale) as revenue
		FROM Sales_Report s
		JOIN Sales_Report_Details spd  ON Sales_Report_ID = s.ID
		JOIN Product p ON product_id = p.ID
		GROUP BY report_id, Date
		ORDER BY Date DESC;
END &&

CREATE PROCEDURE fetch_single_sale(IN id INT)
BEGIN
     SELECT 
            s.ID as report_id, 
            s.Date,
            s.Comment,
            s.Hours, 
            sum(QuantitySold * ( PriceAtSale - FoodCostAtSale) - QuantityTrashed * FoodCostAtSale) as profit, 
            sum(QuantitySold * PriceAtSale) as revenue,
            sum(QuantityTrashed * FoodCostAtSale) as lost
		FROM Sales_Report s
		JOIN Sales_Report_Details spd  ON Sales_Report_ID = s.ID
		JOIN Product p ON product_id = p.ID
        WHERE s.ID = id
		GROUP BY report_id, Date
		ORDER BY Date DESC;
END &&



CREATE PROCEDURE fetch_single_sale_details(IN id INT)
BEGIN
    SELECT  spd.product_id, 
            Name, 
            PriceAtSale, 
            StartQuantity, 
            QuantitySold, 
            QuantityTrashed, 
            FoodCostAtSale,
            QuantitySold * ( PriceAtSale - FoodCostAtSale) - QuantityTrashed * FoodCostAtSale as profit,
            QuantitySold * PriceAtSale as revenue,
            QuantityTrashed * FoodCostAtSale as lost
    FROM Sales_Report_Details spd
    JOIN Sales_Report s ON s.ID = spd.Sales_Report_ID
    JOIN Product p ON p.ID = spd.product_id
    WHERE Sales_Report_ID = id
    ORDER BY QuantitySold DESC;
END &&

CREATE PROCEDURE fetch_all_products()
BEGIN
    SELECT p.ID as product_id, Name
    FROM Product p;
END &&

CREATE PROCEDURE fetch_single_product(IN id INT)
BEGIN
    SELECT *
    FROM Product p
    WHERE p.ID = id;
END&&

CREATE PROCEDURE fetch_sale_profit_in_range(IN startDate DATE, IN endDate DATE)
BEGIN
		SELECT 
            s.ID as report_id, 
            s.Date,
            sum(QuantitySold * ( PriceAtSale - FoodCostAtSale) - QuantityTrashed * FoodCostAtSale) as profit, 
            sum(QuantitySold * PriceAtSale) as revenue

		FROM Sales_Report s
		JOIN Sales_Report_Details spd  ON spd.Sales_Report_ID = s.ID
        WHERE s.Date >= startDate AND s.Date <= endDate
		GROUP BY report_id, Date
		ORDER BY Date DESC;
END&&

CREATE PROCEDURE fetch_order_profit_in_range(IN startDate DATE, IN endDate DATE)
BEGIN
	SELECT
		DatePlaced, 
		sum(Quantity * (PriceAtSale - FoodCostAtSale)) as profit,
		sum(Quantity * PriceAtSale) as revenue 
	FROM `Order` o
    JOIN Order_Details od ON od.order_id = o.ID
    WHERE DatePlaced >= startDate AND DatePlaced <= endDate
    GROUP BY DatePlaced
    ORDER BY DatePlaced DESC;
END&&

CREATE PROCEDURE fetch_order_profit()
BEGIN
	SELECT 
		IFNULL(sum(Quantity * (PriceAtSale - FoodCostAtSale)),0) as profit,
		IFNULL(sum(Quantity * PriceAtSale),0) as revenue 
	FROM `Order` o
    JOIN Order_Details od ON od.order_id = o.ID;
END&&


CREATE PROCEDURE fetch_sale_profit()
BEGIN
		SELECT 
            IFNULL(sum(QuantitySold * ( PriceAtSale - FoodCostAtSale) - QuantityTrashed * FoodCostAtSale),0) as profit, 
            IFNULL(sum(QuantitySold * PriceAtSale),0) as revenue
		FROM Sales_Report s
		JOIN Sales_Report_Details spd  ON Sales_Report_ID = s.ID;
END&&

CREATE PROCEDURE fetch_order_profit_lastMonth()
BEGIN
	SELECT 
		IFNULL(sum(Quantity * (PriceAtSale - FoodCostAtSale)),0) as profit,
		IFNULL(sum(Quantity * PriceAtSale),0) as revenue 
	FROM `Order` o
    JOIN Order_Details od ON od.order_id = o.ID
    WHERE YEAR(DatePlaced) <= YEAR(CURRENT_DATE - INTERVAL 1 MONTH)
    AND MONTH(DatePlaced) <= MONTH(CURRENT_DATE - INTERVAL 1 MONTH);
END&&

CREATE PROCEDURE fetch_sale_profit_lastMonth()
BEGIN
		SELECT 
            IFNULL(sum(QuantitySold * ( PriceAtSale - FoodCostAtSale) - QuantityTrashed * FoodCostAtSale),0) as profit, 
            IFNULL(sum(QuantitySold * PriceAtSale),0) as revenue
		FROM Sales_Report s
		JOIN Sales_Report_Details spd  ON Sales_Report_ID = s.ID
        WHERE YEAR(Date) <= YEAR(CURRENT_DATE - INTERVAL 1 MONTH)
        AND MONTH(Date) <= MONTH(CURRENT_DATE - INTERVAL 1 MONTH);
END&&

CREATE PROCEDURE fetch_sales_two_weeks()
BEGIN
		SELECT 
            SUM(StartQuantity) as quantity,
            SUM(QuantityTrashed) as trash,
            s.Date
		FROM bakery.Sales_Report s
		JOIN bakery.Sales_Report_Details spd  ON Sales_Report_ID = s.ID
        WHERE s.Date >= DATE(NOW()) + INTERVAL -14  DAY
            AND s.Date <  DATE(NOW()) + INTERVAL  0 DAY
		GROUP BY s.Date
        ORDER BY s.Date DESC;
END&&
CREATE PROCEDURE fetch_order_quantity()
BEGIN
		SELECT 
            SUM(StartQuantity) as quantity,
            SUM(QuantityTrashed) as trash,
            s.Date
		FROM bakery.Sales_Report s
		JOIN bakery.Sales_Report_Details spd  ON Sales_Report_ID = s.ID
        WHERE s.Date >= DATE(NOW()) + INTERVAL -14  DAY
            AND s.Date <  DATE(NOW()) + INTERVAL  0 DAY
		GROUP BY s.Date
        ORDER BY s.Date DESC;
END&&

CREATE PROCEDURE fetch_sales_quantity()
BEGIN
		SELECT 
           SUM(QuantitySold) as salesQuantity
		FROM Sales_Report_Details spd;
END&&

DELIMITER ;