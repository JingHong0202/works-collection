'use strict';
exports.main = async (event, context) => {
	const db = uniCloud.database()
	return await db.collection('works-collection').doc(event._id).update({
		star: db.command.inc(1),
	})
};
