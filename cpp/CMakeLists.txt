cmake_minimum_required(VERSION 3.10)
project(MathExercises)

set(CMAKE_CXX_STANDARD 17)

# Inclure les répertoires d'en-têtes
include_directories(${CMAKE_SOURCE_DIR}/include)

# Ajouter la bibliothèque JSON
find_package(nlohmann_json CONFIG REQUIRED)

# Ajouter tous les fichiers source
set(SOURCES
    src/main.cpp
    src/loader.cpp
    src/math_generator.cpp
)

# Générer l'exécutable
add_executable(MathExercises ${SOURCES})

# Lier la bibliothèque JSON
target_link_libraries(MathExercises PRIVATE nlohmann_json::nlohmann_json)
