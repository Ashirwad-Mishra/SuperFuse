package superfuse.address_services.Utils;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityUtil
{
    private SecurityUtil(){}

    public static String getCurrentUser()
    {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth == null || !auth.isAuthenticated())
            throw new RuntimeException("Unauthenticated access....................");

        return auth.getPrincipal().toString();
    }
}
