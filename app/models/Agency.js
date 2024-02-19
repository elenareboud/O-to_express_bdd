import client from "../database.js";

class Agency {
  #id;
  #address;
  #phone_number;
  #email;
//on pose la classe
//on liste les propriétés
//dans contructor on les initialise
  constructor(config) {
    this.#id = config.id;
    this.#address = config.address;
    this.#phone_number = config.phone_number;
    this.#email = config.email;
  }
  get id() {
    return this.#id;
  }
  get address() {
    return this.#address;
  }
  get phone_number() {
    return this.#phone_number;
  }
  get email() {
    return this.#email;
  }
  set id(value) {
    this.#id = value;
  }
  set address(value) {
    this.#address = value;
  }
  set phone_number(value) {
    this.#phone_number = value;
  }
  set email(value) {
    this.#email = value;
  }
  async create() {
    const result = await client.query(
      'INSERT INTO agency (address, phone_number, email) VALUES ($1, $2, $3) RETURNING *',
      [this.#address, this.#phone_number, this.#email]
    );
    this.#id = result.rows[0].id;
    return result.rows[0];
  }
  // Méthode statique pour trouver une agence par son ID
  static async findById(id) {
    const result = await client.query('SELECT * FROM agency WHERE id = $1', [id]);
    if (result.rows.length > 0) {
      return new Agency(result.rows[0]);
    } else {
      return null; // Aucune agence trouvée avec cet ID
    }
  }
  // Méthode pour mettre à jour une agence
  async update() {
    const result = await client.query(
      'UPDATE agency SET address = $1, phone_number = $2, email = $3 WHERE id = $4 RETURNING *',
      [this.#address, this.#phone_number, this.#email, this.#id]
    );
    return result.rows[0];
  }
  // Méthode pour supprimer une agence
  async delete() {
    const result = await client.query('DELETE FROM agency WHERE id = $1 RETURNING *', [this.#id]);
    return result.rows[0];
  }
  // Méthode statique pour récupérer toutes les agences
  static async findAll() {
    const result = await client.query('SELECT * FROM agency');
    return result.rows.map(row => new Agency(row));
  }
}

export default Agency;
