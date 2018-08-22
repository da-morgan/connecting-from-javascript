
exports.up = function(knex, Promise) {
    return knex.schema.alterTable('milestones', function(table) {
        table.integer('person_id').references('id').inTable('famous_people');
    }); 
};

exports.down = function(knex, Promise) {
    return knex.schema.table('milestones', function(table){
        table.dropColumn('person_id');
    });
};