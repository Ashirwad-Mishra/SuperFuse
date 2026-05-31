package superfuse.product.productservices.utils;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.UUID;

public class SecurityUtil
{
    private SecurityUtil(){}

    public static UUID getCurrentUser()
    {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null && authentication.isAuthenticated())
        {
            throw new RuntimeException("Authentication error...............................................");
        }

        return (UUID) authentication.getPrincipal();
    }
}
