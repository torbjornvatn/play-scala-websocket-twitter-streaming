package no.bekk

import com.linkedin.led.twitter.Config
import com.linkedin.led.twitter.streaming._
import org.jboss.netty.channel._
import org.jboss.netty.handler.codec.http.websocket.DefaultWebSocketFrame
import java.io.InputStream
import java.io.InputStreamReader
import java.io.BufferedReader
import play._

object FilterStream {

  var locationLatLan = Set[Double]()

  def stream(channel: Channel) = {
	info("Started streaming tweets for location: "+locationLatLan)
    val username = Config.readString("username")
    val password = Config.readString("password")
    val processor = new OutputStreamProcessor(channel)

    val twitterClient = new StreamingClient(username, password, processor)
	twitterClient.filter(0, "length", Set(), locationLatLan, Set())
  }
}

class OutputStreamProcessor(channel: Channel) extends StreamProcessor {
  override def process(is: InputStream): Unit = {
    val reader: BufferedReader = new BufferedReader(new InputStreamReader(is, "UTF-8"))

    var line = reader.readLine()
    while (line != null) {
      channel.write(new DefaultWebSocketFrame(line))
      line = reader.readLine()
    }

    is.close
  }
}
