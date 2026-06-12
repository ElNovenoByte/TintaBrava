package org.novenobyte.tintabrava.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Path;
import java.nio.file.Paths;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Value("${file.public-path}")
    private String publicPath;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        Path rootLocation = Paths.get(uploadDir).toAbsolutePath().normalize();

        System.out.println("=== DEBUG WEBCONFIG ===");
        System.out.println("Directorio actual Java: " + System.getProperty("user.dir"));
        System.out.println("uploadDir configurado: " + uploadDir);
        System.out.println("Sirviendo imágenes desde: " + rootLocation);
        System.out.println("URL pública: /Frontend/imagenes/**");

        registry.addResourceHandler(publicPath + "/**")
                .addResourceLocations(rootLocation.toUri().toString());

        System.out.println("Sirviendo imágenes desde: " + rootLocation);
    }
}