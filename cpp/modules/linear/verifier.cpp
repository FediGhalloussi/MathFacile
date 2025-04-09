#include "modules/linear/verifier.h"
#include <string>
#include <cmath>
#include <sstream>
#include <algorithm>
#include <numeric>

const double EPSILON = 1e-6;

bool parseFractionOrDouble(const std::string& input, double& result) {
    std::string trimmed = input;
    trimmed.erase(remove_if(trimmed.begin(), trimmed.end(), ::isspace), trimmed.end());

    size_t slashPos = trimmed.find('/');
    if (slashPos != std::string::npos) {
        try {
            double numerator = std::stod(trimmed.substr(0, slashPos));
            double denominator = std::stod(trimmed.substr(slashPos + 1));
            if (denominator == 0) return false;
            result = numerator / denominator;
            return true;
        } catch (...) {
            return false;
        }
    }

    try {
        result = std::stod(trimmed);
        return true;
    } catch (...) {
        return false;
    }
}

bool verifyLinearEquation(const std::string& question, const std::string& answer, std::string* expected) {
    double a, b;
    std::sscanf(question.c_str(), "%lfx + %lf = 0", &a, &b);
    if (a == 0) return false;

    double solution = -b / a;

    // Formatage du résultat attendu
    int num = static_cast<int>(-b);
    int denom = static_cast<int>(a);
    int gcd = std::gcd(num, denom);
    num /= gcd;
    denom /= gcd;

    if (denom == 1) {
        *expected = "x = " + std::to_string(num);
    } else {
        *expected = "x = \\\\frac{" + std::to_string(num) + "}{" + std::to_string(denom) + "}";
    }

    double userAnswer;
    if (!parseFractionOrDouble(answer, userAnswer)) return false;

    return std::abs(userAnswer - solution) < EPSILON;
}
