<?php
class <%= _.capitalize(crudSingle) %>_Controller {
	public static function all(){
		echo json_encode(<%= _.capitalize(crudSingle) %>_Storage::all() );
	}
	public static function create() {
		$data = json_decode(Flight::request()->body,true);
		echo json_encode( <%= _.capitalize(crudSingle) %>_Storage::create($data) );
	}
	public static function findOne($id) {
		echo json_encode( <%= _.capitalize(crudSingle) %>_Storage::findOne($id) );
	}
	public static function update($id) {
		$data = json_decode(Flight::request()->body,true);
		echo json_encode( <%= _.capitalize(crudSingle) %>_Storage::update($id,$data) );
	}
	public static function remove($id) {
		echo json_encode( <%= _.capitalize(crudSingle) %>_Storage::remove($id) );
	}
}
