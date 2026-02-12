package com.superfuse.profile.profile_service.Utils;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityUtil
{
    private SecurityUtil() {}

    public static String getCurrentUser()
    {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if(authentication == null || !authentication.isAuthenticated())
        {
            throw new RuntimeException("Can't authenticate you...................................");
        }

        return authentication.getPrincipal().toString();
    }
}
