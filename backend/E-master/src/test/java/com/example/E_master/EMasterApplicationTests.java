package com.example.E_master;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class EMasterApplicationTests {

	@LocalServerPort
	private int port;

	@Autowired
	private TestRestTemplate restTemplate;

	private String baseUrl;

	@BeforeEach
	void setUp() {
		baseUrl = "http://localhost:" + port;
	}

	@Test
	@DisplayName("Context Loads")
	void contextLoads() {
		// This test ensures that the Spring context loads successfully
	}

	@Test
	@DisplayName("Home Page Returns 200 OK")
	void homePageReturns200() {
		ResponseEntity<String> response = restTemplate.getForEntity(baseUrl + "/", String.class);
		assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
	}

	@Test
	@DisplayName("Non-existent Page Returns 404 Not Found")
	void nonExistentPageReturns404() {
		ResponseEntity<String> response = restTemplate.getForEntity(baseUrl + "/non-existent-page", String.class);
		assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
	}

	// Add more tests here as you develop your application
}
