package org.novenobyte.tintabrava.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class FileStorageService {

    @Value("${file.upload-dir}")
    private String uploadDir;

    /**
     * Guarda una imagen en la carpeta correspondiente y devuelve la ruta relativa para la BD.
     * @param file archivo subido
     * @param subPath ruta relativa dentro de uploadDir (ej: "productos/gorras/gorra-bandas/30100010")
     * @param fileName nombre base del archivo (ej: "30100010-1")
     * @return ruta completa para guardar en BD (ej: "/Frontend/imagenes/productos/gorras/gorra-bandas/30100010/30100010-1.jpg")
     */
    public String saveImage(MultipartFile file, String subPath, String fileName) throws IOException {
        // Obtener extensión original
        String originalFilename = file.getOriginalFilename();
        String extension = "";
        if (originalFilename != null && originalFilename.contains(".")) {
            extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        }
        String fullFileName = fileName + extension;

        // Resolver rutas absolutas
        Path rootLocation = Paths.get(uploadDir).toAbsolutePath().normalize();
        Path targetDir = rootLocation.resolve(subPath).normalize();
        if (!Files.exists(targetDir)) {
            Files.createDirectories(targetDir);
        }
        Path targetPath = targetDir.resolve(fullFileName);
        Files.copy(file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);

        // Devolver ruta relativa accesible desde el navegador
        return "/Frontend/imagenes/" + subPath + "/" + fullFileName;
    }
}