const sqlHelper = {
	SelectSimple(table, data = null, cols = [], sort = null) {
		let query = `SELECT * FROM ${table}`;
		const where = [];
		const values = [];

		if (data) {
			const keys = Object.keys(data);
			for (key of keys) {
				where.push(`${key}=?`);
				values.push(data[key]);
			}
			if (where.length > 0 ) {
				query += ` WHERE ` + where.join(' AND ');
			}			
		}
		if (cols.length > 0) {			
			query = query.replace('*', cols.join(', '));
		}

		if(sort) {
			let sorts = [];
			const keys = Object.keys(sort);
			for(const key of keys) {
				sorts.push(key + (sort[key] ? ' ASC ' : ' DESC '))
			}
			if(sorts.length ) {
				query += ` ORDER BY ` + sorts.join(', ');
			}
		}

		return { query, values };
	},
	Insert(table, data) {
		let query = `INSERT INTO ${table} ({1}) VALUES ({2})`;
		const keys = Object.keys(data);
		const prepare = new Array(keys.length).fill('?').join(', ');
		const values = [];
		for (const key of keys) {
			values.push(data[key]);
		}
		query = query.replace('{1}', keys.join(', '));
		query = query.replace('{2}', prepare);
		return { query, values };
	},

	InsertOrUpdate(table, data) {
		let query = `INSERT INTO ${table} ({1}) VALUES ({2}) ON DUPLICATE KEY UPDATE {3}`;
		const keys = Object.keys(data);
		const prepare = new Array(keys.length).fill('?').join(', ');
		const values = [];
		const sets = [];
		for (const key of keys) {
			values.push(data[key]);
			sets.push(`${key}=?`)
		}
		query = query.replace('{1}', keys.join(', '));
		query = query.replace('{2}', prepare);
		query = query.replace('{3}', sets.join(', '));
		return { query, values : values.concat(values) };

	},

	Update(table, data, where) {
		let query = `UPDATE ${table} SET {1} WHERE {2}`;
		const keys = Object.keys(data);
		const sets = [];
		const values = [];
		for (const key of keys) {
			sets.push(`${key}=?`);
			values.push(data[key]);
		}
		query = query.replace('{1}', sets.join(', '));

		const keys2 = Object.keys(where);
		const wheres = [];
		for (const key of keys2) {
			wheres.push(`${key}=?`);
			values.push(where[key]);
		}
		query = query.replace('{2}', wheres.join(' AND '));
		return { query, values };
	},
	DeleteSimple(table, data) {
		let query = `DELETE FROM ${table}`;
		const wheres = [];
		const values = [];

		if(data) {
			const keys = Object.keys(data);
			for(key of keys) {
				wheres.push(`${key}=?`);
				values.push(data[key]);
			}
			query += ` WHERE ` + wheres.join(' AND ');
		} else {
			throw new Error('DELETE ???????????? WHERE?????? ????????? ?????????.');
		}
		return { query, values };
	},

	OracleInsert(table, data) {

		let query = `INSERT INTO ${table} ({1}) VALUES ({2})`;
		const keys = Object.keys(data);
		//const prepare = new Array(keys.length).fill('?').join(', ');
		const prepare = Array(keys.length).fill().map((_, index) => ":"+(index + 1)).join(', ');
		const values = [];
		for (const key of keys) {
			values.push(data[key]);
		}
		query = query.replace('{1}', keys.join(', '));
		query = query.replace('{2}', prepare);
		return { query, values };
	},
	OracleUpdate(table, data, where) {
		let query = `UPDATE ${table} SET {1} WHERE {2}`;
		const keys = Object.keys(data);
		const sets = [];
		const values = [];
		for (const key of keys) {
			sets.push(`${key}=:` + key.toString());
			values.push(data[key]);
		}
		query = query.replace('{1}', sets.join(', '));

		const keys2 = Object.keys(where);
		const wheres = [];
		for (const key of keys2) {
			wheres.push(`${key}=:` + key.toString());
			values.push(where[key]);
		}
		query = query.replace('{2}', wheres.join(' AND '));
		return { query, values };
	},
	OracleDeleteSimple(table, data) {
		let query = `DELETE FROM ${table}`;
		const wheres = [];
		const values = [];

		if(data) {
			const keys = Object.keys(data);
			for(key of keys) {
				wheres.push(`${key}=:` + key.toString());
				values.push(data[key]);
			}
			query += ` WHERE ` + wheres.join(' AND ');
		} else {
			throw new Error('DELETE ???????????? WHERE?????? ????????? ?????????.');
		}
		return { query, values };
	},
};

module.exports = sqlHelper;