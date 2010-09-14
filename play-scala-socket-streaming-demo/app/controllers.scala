package controllers

import play._
import play.mvc._
import play.libs._
import websocket._
import models._
import bootstrap._
import no.bekk.FilterStream

object Application extends Controller {

    def map(selectedLocation: String = "San Fransisco") {
		val possibleLocations = Location.findAll().map {loc => loc.name}
        render(possibleLocations,selectedLocation)
    }

	def choose(locationSelection: String) {
		val locationLatLan = Location.find("byName", locationSelection).first match {
  			case Some(location) => location.latLan.split(",").toList.map( x => x.toDouble).toSet
  			case None => Set[Double]()
		}
		FilterStream.locationLatLan = locationLatLan
		info("Location "+locationSelection+" ["+locationLatLan+"] chosen")
		map(locationSelection)
	}
}

object Locations extends Controller with CRUDFor[Location] {
	
}





