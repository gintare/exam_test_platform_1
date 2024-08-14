package lt.techin.gintare.back.controller;

import lombok.AllArgsConstructor;
import lt.techin.gintare.back.dto.CategoryRequestDTO;
import lt.techin.gintare.back.dto.CategoryResponseDTO;
import lt.techin.gintare.back.service.CategoryService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
@AllArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @PostMapping("/api/category")
    public CategoryResponseDTO createCategory(@RequestBody CategoryRequestDTO categoryRequestDTO){
           return categoryService.createCategory(categoryRequestDTO);
    }
}
