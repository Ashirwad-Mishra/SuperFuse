package superfuse.user_service.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;
import superfuse.user_service.Model.User;

import java.util.Date;

@Component
public class JWTService
{
    private final String secretKey =
            "THIS_IS_A_VERY_LONG_256_BIT_SECRET_KEY_FOR_JWT_SECURITY_123456";

    public String generateToken (User user)
    {
        return Jwts.builder()
                .setSubject(user.getUserName())
                .claim("id" , user.getUserId())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000*60*60*24))
                .signWith(Keys.hmacShaKeyFor(secretKey.getBytes()), SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractUserName(String token)
    {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey.getBytes())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }
}
