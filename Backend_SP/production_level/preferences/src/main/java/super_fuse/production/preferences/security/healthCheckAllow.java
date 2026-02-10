//package super_fuse.production.preferences.security;
//
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.Customizer;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.web.SecurityFilterChain;
//
//@Configuration
//public class healthCheckAllow
//{
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception
//    {
//        httpSecurity
//                .csrf(csrf -> csrf.disable())
//                .authorizeHttpRequests(
//                        auth -> auth
//                                .requestMatchers("/health", "/health/**")
//                                .permitAll()
//                                .anyRequest()
//                                .authenticated()
//                )
//                .httpBasic(Customizer.withDefaults());
//
//        return httpSecurity.build();
//    }
//}
