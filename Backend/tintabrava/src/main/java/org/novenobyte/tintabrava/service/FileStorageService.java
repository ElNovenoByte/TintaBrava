package org.novenobyte.tintabrava.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class FileStorageService {

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Value("${file.public-path}")
    private String publicPath;

    public String saveImage(MultipartFile file, String subPath, String fileName) throws IOException {

        if (file == null || file.isEmpty()) {
            throw new IOException("El archivo está vacío o no fue enviado.");
        }

        String originalFilename = file.getOriginalFilename();

        if (originalFilename == null || !originalFilename.contains(".")) {
            throw new IOException("El archivo no tiene extensión válida.");
        }

        String extension = originalFilename
                .substring(originalFilename.lastIndexOf("."))
                .toLowerCase();

        if (!extension.matches("\\.(jpg|jpeg|png|webp)")) {
            throw new IOException("Formato de imagen no permitido: " + extension);
        }

        String fullFileName = fileName + extension;

        Path rootLocation = Paths.get(uploadDir).toAbsolutePath().normalize();
        Path targetDir = rootLocation.resolve(subPath).normalize();

        Files.createDirectories(targetDir);

        Path targetPath = targetDir.resolve(fullFileName).normalize();

        System.out.println("=== DEBUG RUTAS FILE STORAGE ===");
        System.out.println("Directorio actual Java: " + System.getProperty("user.dir"));
        System.out.println("uploadDir configurado: " + uploadDir);
        System.out.println("rootLocation absoluto: " + rootLocation);
        System.out.println("subPath: " + subPath);
        System.out.println("targetDir: " + targetDir);
        System.out.println("targetPath: " + targetPath);

        try (InputStream inputStream = file.getInputStream()) {
            Files.copy(inputStream, targetPath, StandardCopyOption.REPLACE_EXISTING);
        }

        System.out.println("Imagen guardada en: " + targetPath);
        System.out.println("Existe físicamente: " + Files.exists(targetPath));

        return publicPath + "/" + subPath + "/" + fullFileName;
    }
}