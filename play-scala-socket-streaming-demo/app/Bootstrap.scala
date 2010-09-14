package bootstrap

import play._
import play.jobs._
import play.test._
import websocket._
import org.jboss.netty.channel._
 
import models._
 
@OnApplicationStart
class Bootstrap extends Job {
	
    override def doJob = {
		info("Bootstrapping...")
        // Check if the database is empty
        if(Location.count() == 0) {
            Fixtures.load("initial-data.yml")
        }
		createSocketServer
    }
	
	def createSocketServer = {
		val socketServer = new WebSocketServer()
		socketServer.openChannel()
		info("Bootstrapped.")
	}
 
}