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
    PRIMARY KEY (order_id),
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
CREATE PROCEDURE fetch_orders_in_range(IN startDate DATE, in endDate DATE)
BEGIN
		SELECT
			o.ID as order_id, Customer_ID, Username, DatePlaced, PickupTime, Fulfilled, o.Comment
		FROM `Order` o
		JOIN Customer c ON c.ID = o.Customer_ID
        WHERE DatePlaced >= startDate AND DatePlaced <= endDate
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
        o.ID as order_id, Customer_ID, Username, DatePlaced, PickupTime, Fulfilled, o.Comment
    FROM `Order` o
    JOIN Customer c ON c.ID = o.Customer_ID
    WHERE o.ID = id;
END &&

CREATE PROCEDURE fetch_single_order_details(IN id INT)
BEGIN
    SELECT
        product_id, Name, PriceAtSale, Quantity, od.Comment 
    FROM Order_Details od
    JOIN `Order` o ON o.ID = od.order_id
    JOIN Product p ON p.ID = od.product_id
    WHERE order_id = id
    ORDER BY Name;
END &&

CREATE PROCEDURE fetch_single_order_detail(IN o_id INT, IN p_id INT)
BEGIN
    SELECT
        product_id, Name, PriceAtSale, Quantity, od.Comment 
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

CREATE PROCEDURE fetch_customer_favorite(IN cust_id INT)
BEGIN
	SELECT 
    p.ID as product_id, p.Name as favorite, MAX(Total) as total
	FROM(
		SELECT
			c.ID as id,
			p.Name as name,
			SUM(od.Quantity) as total
		FROM Customer c
			JOIN `Order` o ON c.ID = o.Customer_ID
			JOIN Order_Details od ON o.ID = od.order_id
			JOIN Product p ON od.product_id = p.ID
		WHERE c.ID = cust_id
		GROUP BY
			c.ID, p.Name
            ) as sub
	JOIN Customer c ON sub.id = c.id
	JOIN Product p ON sub.name = p.Name
	GROUP BY sub.id;
END &&

CREATE PROCEDURE fetch_customer_points(IN cust_id INT)
BEGIN
	SELECT 
    IFNULL((SELECT SUM(Amount) as total FROM Payment WHERE Payment_Type_ID != 3), 0)as gained,
    IFNULL((SELECT SUM(Amount) as total FROM Payment WHERE Payment_Type_ID = 3), 0) as spent
    FROM `Order` o
    WHERE Customer_ID = cust_id;
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
SELECT p.ID, p.Name, p.price, p.FoodCost, p.TimeCost, ri.grams, r.ItemsProduced
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

CREATE PROCEDURE fetch_all_sales()
BEGIN
    SELECT s.ID as Sales_ID, Date, Comment
    FROM Sales_Report s
    ORDER BY Date DESC;
END &&

CREATE PROCEDURE fetch_single_sale(IN id INT)
BEGIN
    SELECT s.ID as Sales_ID, Date, Comment
    FROM Sales_Report s
    WHERE s.ID = id;
END &&

CREATE PROCEDURE fetch_single_sale_details(IN id INT)
BEGIN
    SELECT spd.product_id, Name, PriceAtSale, StartQuantity, QuantitySold, QuantityTrashed, FoodCostAtSale
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

CREATE PROCEDURE insert_new_report_details(IN report_id INT, IN product_id INT, IN start_num INT, IN sold_num INT, IN trash_num INT, IN price DECIMAL(6,2), IN foodcost DECIMAL(6,2))
BEGIN
    INSERT INTO Sales_Report_Details VALUES(report_id, product_id,start_num, sold_num,trash_num,price,foodcost);
END &&

CREATE PROCEDURE fetch_single_product(IN id INT)
BEGIN
    SELECT *
    FROM product p
    WHERE p.ID = id;
END&&

CREATE PROCEDURE fetch_sale_profit_in_range(IN startDate DATE, IN endDate DATE)
BEGIN
		SELECT 
            s.ID as report_id, 
            s.Date,
            s.Comment, 
            sum(QuantitySold * ( PriceAtSale - FoodCostAtSale) - QuantityTrashed * FoodCostAtSale) as profit, 
            sum(QuantitySold * PriceAtSale) as revenue
		FROM Sales_Report s
		JOIN Sales_Report_Details spd  ON Sales_Report_ID = s.ID
		JOIN Product p ON product_id = p.ID
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

DELIMITER ;