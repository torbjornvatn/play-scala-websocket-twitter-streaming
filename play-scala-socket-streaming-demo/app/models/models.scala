package models
import play.db.jpa._
import play.data.Validators._

@Entity
class Location(
	var name: String,
	var latLan: String
) extends Model {
	override def toString =  name + " - " + latLan
}

object Location extends QueryOn[Location] {
	
}