cmake_minimum_required(VERSION 3.10)
project(MathExercises)

set(CMAKE_CXX_STANDARD 17)


# Ajouter la bibliothèque JSON
find_package(nlohmann_json CONFIG REQUIRED)

include_directories(${PROJECT_SOURCE_DIR})

# Ajouter tous les fichiers source
set(SOURCES
    main.cpp
    modules/quadratic/generator.cpp
    modules/quadratic/verifier.cpp
)

# Générer l'exécutable
add_executable(MathExercises ${SOURCES})

# Lier la bibliothèque JSON
target_link_libraries(MathExercises PRIVATE nlohmann_json::nlohmann_json)
