<?php
class <%= crudSingle %>_Controller {
	public static function all(){
		echo json_encode(<%= crudPlural %>_Storage::all() );
	}
	public static function create() {
		$data = json_decode(Flight::request()->body);
		echo json_encode( <%= crudPlural %>_Storage::create($data) );
	}
	public static function findOne($id) {
		echo json_encode( <%= crudPlural %>_Storage::findOne($id) );
	}
	public static function update($id) {
		$data = json_decode(Flight::request()->body);
		echo json_encode( <%= crudPlural %>_Storage::update($id,$data) );
	}
	public static function delete($id) {
		echo json_encode( <%= crudPlural %>_Storage::delete($id) );
	}
}
