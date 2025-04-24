// product_model.js (ES Modules version)
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Initialize database connection
let db;

(async () => {
  db = await open({
    filename: './data/database.db', // Path to your SQLite file
    driver: sqlite3.Database
  });
})();

class ProductModel {
  async getAllProducts() {
    return await db.all('SELECT * FROM products');
  }

  async getProductById(id) {
    return await db.get('SELECT * FROM products WHERE id = ?', [id]);
  }

  async updateProduct(id, updatedProduct) {
    const { name, price, category } = updatedProduct;
    const result = await db.run(
      'UPDATE products SET name = ?, price = ?, category = ? WHERE id = ?',
      [name, price, category, id]
    );
    return result.changes > 0; // Returns true if any row was updated
  }
}

export default ProductModel; // Export instance