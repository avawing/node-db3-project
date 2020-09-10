const db = require("../knexconfig");

function find() {
  return db("schemes");
}

function findById(id) {
  return db("schemes")
    .where({ id })
    .then((scheme) => {
      if (!scheme.length) {
        return null;
      } else {
        return scheme;
      }
    });
}

function findSteps(id) {
  //join steps, steps.schemes_id, schemes.id
  //select steps.id, steps.step_number,
  //steps.instructions, schemes.scheme_name,
  //where({id}) OR .where({id})
  //db("steps").where({scheme_id: id})

  return db("schemes")
    .join("steps", "steps.scheme_id", "schemes.id")
    .select(
      "steps.id",
      "steps.step_number",
      "steps.instructions",
      "schemes.scheme_name"
    )
    .where({"schemes.id": id});
}

function add(scheme) {
  db("scheme")
    .insert(scheme)
    .then((id) => {
      return findById(id[0]);
    })
    .catch((err) => {
      return null;
    });
}

function update(changes, id) {
  db("scheme")
    .where({ id })
    .update(changes)
    .then((scheme) => {
      if (scheme) {
        return findById(id);
      } else {
        return null;
      }
    })
    .catch((err) => {
      return null;
    });
}

function remove(id) {
  return db("schemes").where({ id }).del();
}

module.exports = { find, findById, findSteps, add, update, remove };
