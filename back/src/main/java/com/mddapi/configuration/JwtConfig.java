package com.mddapi.configuration;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JwtConfig {
    

    /**
     * Charge la clé secrète pour la rendre accessible via un Autowired
     */
    @Bean
	public SecretKey jwtSecretKey(@Value("${security.jwt.secret-key}") String secret) {
                byte[] keyBytes = secret.getBytes();
                return new SecretKeySpec(keyBytes, "HmacSHA256");
	}

    /**
     * Charge la clé d'expiration pour la rendre accessible via un Autowired
     */
    @Bean
    public int jwtKeyExpiracy(@Value("${security.jwt.expiration-time}") int time){
        return time;
    }
}
