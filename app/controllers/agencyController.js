import client from "../database.js";
import Agency from "../models/Agency.js";

const agencyController = {
  list: async function(req, res) {
    try {
      const result = await client.query('SELECT * FROM agency ORDER BY address;')
      res.render('list', {
      agencies : result.rows,
    });
    }catch(error) {
      console.error(error);
      res.status(500).render ('error')
    } 
  },
  detail: async function(req, res, next) {
    try {
      const result = await client.query('SELECT * FROM agency WHERE id=$1', [req.params.id]);
      if (result.rowCount > 0) {
        res.render('detail', {
          agency: result.rows[0],
        });
      }
      else {
        next();
      }
    } catch (error) {
      console.error(error);
      res.status(404).render('not-found');
    }
  },
  add: async function(req, res) {
    try {
      //je crée la nouv agency
      const agency = new Agency(req.query);
      //je l'enregistre
      agency.create();
      res.redirect('/'); 
        } catch (error) {
      console.error(error);
      res.status(404).render('not-found');
    }
  },
  
};
export default agencyController;

