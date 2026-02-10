package super_fuse.production.preferences.utils;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityUtil
{
    private SecurityUtil(){}

    public static String getCurrentUser()
    {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth == null || !auth.isAuthenticated())
            throw new RuntimeException("Couldn't authenticate...............................................");

        return auth.getPrincipal().toString();
    }
}
