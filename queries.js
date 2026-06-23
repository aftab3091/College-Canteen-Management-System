// ===============================
// DATABASE: College Canteen System
// ===============================

// ---------- INSERT QUERIES ----------

// Students
db.students.insertMany([
{ _id: 1, student_name: "Aftab", department: "CSE", year: 2, phone_number: "9876543210" },
{ _id: 2, student_name: "Charan", department: "ECE", year: 3, phone_number: "9123456780" }
]);

// Food Items
db.food_items.insertMany([
{ _id: 101, food_name: "Veg Burger", category: "Snacks", price: 60, availability: true },
{ _id: 102, food_name: "Coffee", category: "Beverages", price: 20, availability: true }
]);

// Orders
db.orders.insertMany([
{
  _id: 1001,
  student_id: 1,
  order_date: new Date(),
  items: [
    { food_id: 101, food_name: "Veg Burger", quantity: 2, price: 60 },
    { food_id: 102, food_name: "Coffee", quantity: 1, price: 20 }
  ],
  total_amount: 140,
  status: "Delivered"
}
]);

// Payments
db.payments.insertMany([
{ _id: 5001, order_id: 1001, amount: 140, payment_method: "UPI", payment_date: new Date() }
]);

// Inventory
db.inventory.insertMany([
{ _id: 1, item_name: "Bread", quantity: 100, unit: "pieces", minimum_stock: 20 }
]);

// Suppliers
db.suppliers.insertMany([
{ _id: 1, supplier_name: "Fresh Foods Ltd", phone: "9999999999", address: "Chennai" }
]);

// Purchases
db.purchases.insertMany([
{
  _id: 1,
  supplier_id: 1,
  purchase_date: new Date(),
  items: [
    { inventory_id: 1, quantity: 50, cost: 500 }
  ],
  total_cost: 500
}
]);

// Staff
db.staff.insertMany([
{ _id: 1, staff_name: "Ramesh", position: "Chef", salary: 15000, phone: "8888888888" }
]);

// Feedback
db.feedback.insertMany([
{ _id: 1, student_id: 1, rating: 5, comments: "Good food", feedback_date: new Date() }
]);


// ---------- BASIC FIND QUERIES ----------

// Show all students
db.students.find();

// Show all food items
db.food_items.find();

// Show available food items
db.food_items.find({ availability: true });

// Find student by ID
db.students.find({ _id: 1 });

// Find orders of a student
db.orders.find({ student_id: 1 });

// Find delivered orders
db.orders.find({ status: "Delivered" });

// Find payments
db.payments.find();

// Find feedback
db.feedback.find();


// ---------- UPDATE QUERIES ----------

// Update student phone
db.students.updateOne(
  { _id: 1 },
  { $set: { phone_number: "9999999999" } }
);

// Update food price
db.food_items.updateOne(
  { _id: 101 },
  { $set: { price: 70 } }
);

// Change order status
db.orders.updateOne(
  { _id: 1001 },
  { $set: { status: "Preparing" } }
);

// Update inventory quantity
db.inventory.updateOne(
  { _id: 1 },
  { $inc: { quantity: -10 } }
);


// ---------- DELETE QUERIES ----------

// Delete a student
db.students.deleteOne({ _id: 2 });

// Delete a food item
db.food_items.deleteOne({ _id: 102 });

// Delete an order
db.orders.deleteOne({ _id: 1001 });


// ---------- AGGREGATION QUERIES ----------

// Total sales
db.orders.aggregate([
{
  $group: {
    _id: null,
    total_sales: { $sum: "$total_amount" }
  }
}
]);

// Orders count per student
db.orders.aggregate([
{
  $group: {
    _id: "$student_id",
    total_orders: { $sum: 1 }
  }
}
]);

// Most sold items
db.orders.aggregate([
{ $unwind: "$items" },
{
  $group: {
    _id: "$items.food_name",
    total_quantity: { $sum: "$items.quantity" }
  }
},
{ $sort: { total_quantity: -1 } }
]);

// Low stock items
db.inventory.find({
  $expr: { $lt: ["$quantity", "$minimum_stock"] }
});

// Average rating
db.feedback.aggregate([
{
  $group: {
    _id: null,
    avg_rating: { $avg: "$rating" }
  }
}
]);


// ---------- SORT & LIMIT ----------

// Sort food by price (ascending)
db.food_items.find().sort({ price: 1 });

// Sort orders by date (latest first)
db.orders.find().sort({ order_date: -1 });

// Limit results
db.orders.find().limit(5);


// ---------- SEARCH / FILTER ----------

// Find food items in Snacks category
db.food_items.find({ category: "Snacks" });

// Find students in CSE
db.students.find({ department: "CSE" });

// Find orders above 100
db.orders.find({ total_amount: { $gt: 100 } });


// ---------- ADVANCED ----------

// Projection (only names)
db.students.find({}, { student_name: 1, _id: 0 });

// Count documents
db.orders.countDocuments();

// Distinct categories
db.food_items.distinct("category");
