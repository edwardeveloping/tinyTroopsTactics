package com.spinacastudio.demo;

import java.util.Map;

import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketExtension;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.fasterxml.jackson.databind.util.JSONPObject;

public class WebsocketAppHandler extends TextWebSocketHandler {
    
	private ObjectMapper mapper = new ObjectMapper();
	private WebSocketSession player1Session;
	private WebSocketSession player2Session;
	private int playerCount = 0; // Number of players.

	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		System.out.println("New user: " + session.getId());

		// Assign user to player1 or player2 and send the result back to the session.
		if(playerCount == 0){

			player1Session = session;
			SendMessageToSession(session, "SessionId", "1");
			playerCount += 1;

		}else if(playerCount == 1){

			player2Session = session;
			SendMessageToSession(session, "SessionId", "2");
			playerCount += 1;

		}else{
			System.out.println("Ammount of maximum players reached.");
			SendMessageToSession(session, "Error", "Ammount of maximum players reached.");
		}
		
	}

	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		System.out.println("Session closed: " + session.getId());
		if(playerCount>0){ playerCount =- 1; }
		
	}

    @Override
	protected void handleTextMessage(WebSocketSession session, TextMessage msg) throws Exception {
		
		System.out.println("Message received: " + msg.getPayload());
		JsonNode message = mapper.readTree(msg.getPayload()); // Convert to JSON.

		String requestType = message.get("type").asText();
		switch (requestType) {
			case "InputUpdate":
				if(session == player1Session){
					
					JsonNode contentNode = message.get("content");
					SendMessageToSession(
						player1Session, 
						"InputUpdate", 
						contentNode.toString()
					);

				}else if(session == player2Session){

				}else{
					System.out.println("An undefined session tried to update its input.");
				}
				
				break;

			default:
				System.out.println("Message type not valid.");
				break;
		}
		
		
	}

	private void SendMessageToSession(
		WebSocketSession session, 
		String type, 
		String content) throws Exception {
			
		session.sendMessage(
		new TextMessage(buildStringedJSON(type, content)));
	}

	private String buildStringedJSON(String type, String content){ // Builds a JSON, returns it as a String
		ObjectNode jsonNode = mapper.createObjectNode();
        jsonNode.put("type", type);
        jsonNode.put("content", content);
		return jsonNode.toString();
	}
}
