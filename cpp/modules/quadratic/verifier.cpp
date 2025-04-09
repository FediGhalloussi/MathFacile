#include "modules/quadratic/verifier.h"
#include <cmath>
#include <string>
#include <sstream>
#include <complex>
#include <regex>
#include <iomanip>

const double EPSILON = 1e-6;

bool parseComplexRoots(const std::string& answer, std::complex<double>& r1, std::complex<double>& r2) {
    std::regex pattern(R"(r1\s*=\s*(-?\d+(?:\.\d+)?)\s*([+-])\s*(\d+(?:\.\d+)?)i\s*\|\s*r2\s*=\s*(-?\d+(?:\.\d+)?)\s*([+-])\s*(\d+(?:\.\d+)?)i)");
    std::smatch match;
    if (std::regex_search(answer, match, pattern)) {
        try {
            double real1 = std::stod(match[1].str());
            double imag1 = std::stod(match[3].str()) * (match[2] == "+" ? 1 : -1);
            double real2 = std::stod(match[4].str());
            double imag2 = std::stod(match[6].str()) * (match[5] == "+" ? 1 : -1);
            r1 = std::complex<double>(real1, imag1);
            r2 = std::complex<double>(real2, imag2);
            return true;
        } catch (...) {
            return false;
        }
    }
    return false;
}

std::string formatComplexExpected(double a, double b, double discriminant) {
    std::ostringstream oss;
    int denom = 2 * static_cast<int>(a);
    int num = static_cast<int>(-b);
    int radicand = static_cast<int>(-discriminant);

    if (num == 0) {
        oss << "r_1 = \\\\frac{\\\\sqrt{" << radicand << "}i}{" << denom << "},\\\\quad r_2 = \\\\frac{-\\\\sqrt{" << radicand << "}i}{" << denom << "}";
    } else {
        oss << "r_1 = \\\\frac{" << num << " + \\\\sqrt{" << radicand << "}i}{" << denom << "},\\\\quad r_2 = \\\\frac{" << num << " - \\\\sqrt{" << radicand << "}i}{" << denom << "}";
    }

    return oss.str();
}

bool verifyQuadraticEquation(const std::string& question, const std::string& answer, std::string* expected) {
    double a, b, c;
    std::sscanf(question.c_str(), "%lf x^2 + %lf x + %lf = 0", &a, &b, &c);
    if (a == 0) return false;

    double discriminant = b * b - 4 * a * c;
    double twoA = 2 * a;

    if (discriminant < 0) {
        *expected = formatComplexExpected(a, b, discriminant);

        std::complex<double> r1, r2;
        if (!parseComplexRoots(answer, r1, r2)) return false;

        std::complex<double> root1((-b + std::sqrt(std::complex<double>(discriminant))) / twoA);
        std::complex<double> root2((-b - std::sqrt(std::complex<double>(discriminant))) / twoA);

        return (std::abs(r1 - root1) < EPSILON && std::abs(r2 - root2) < EPSILON) ||
               (std::abs(r1 - root2) < EPSILON && std::abs(r2 - root1) < EPSILON);
    }

    double root1 = (-b + std::sqrt(discriminant)) / twoA;
    double root2 = (-b - std::sqrt(discriminant)) / twoA;

    std::ostringstream oss;
    oss << "r_1 = " << root1 << " \\\\quad r_2 = " << root2;
    *expected = oss.str();

    try {
        double userAnswer = std::stod(answer);
        return std::abs(userAnswer - root1) < EPSILON || std::abs(userAnswer - root2) < EPSILON;
    } catch (...) {
        return false;
    }
}
