#include <iostream>
#include <string>
#include "modules/integral/generator.h"
#include "modules/integral/verifier.h"

int main() {
    std::string question = generateIntegralExercise();
    std::cout << "Trouve la primitive de : " << question << std::endl;

    std::string userAnswer;
    std::cout << "Votre réponse (avec + C) : ";
    std::getline(std::cin, userAnswer);

    std::string expected;
    if (verifyIntegral(question, userAnswer, &expected)) {
        std::cout << "Bonne réponse !" << std::endl;
    } else {
        std::cout << "Mauvaise réponse." << std::endl;
        std::cout << "Réponse attendue : " << expected << std::endl;
    }

    return 0;
}
