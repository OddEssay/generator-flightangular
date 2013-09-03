<?php
class <%= _.capitalize(crudSingle) %>_Storage {
	protected static $_db = NULL;
	protected static $_collection = NULL;
	protected static function _init() {
		if(!self::$_db) {
			$mongo = new MongoClient();
			self::$_db = $mongo-><%= appName %>;
		}
		if(!self::$_collection) {
			self::$_collection = self::$_db-><%= crudPlural %>;
		}
	}
	public static function all() {
		self::_init();
		return array_values(iterator_to_array( self::$_collection->find() ) );
	}
	public static function create($data) {
		self::_init();
		self::$_collection->insert($data);
		return $data; // _id will be added by the insert and included in the return value.
	}
	public static function findOne($id) {
		self::_init();
		return self::$_collection->findOne( array( '_id' => new MongoId($id) ) );
	}
	public static function update($data) {
		self::_init();
		unset($data->_id); // Don't try to rewrite the id
		$data->updated = new MongoDate(); // Auto add an updated timestamp
		self::$_collection->update( array( '_id' => new MongoId($id) ) , $data );
	}
	public static function delete($id) {
		self::_init();
		
	}
}
