import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppTheme {
  AppTheme._();

  // Primary Lime-Green palette (exact hex values from the design)
  static const Color lime900 = Color(0xFF003208);
  static const Color lime800 = Color(0xFF0C7415);
  static const Color lime700 = Color(0xFF35831F);
  static const Color lime600 = Color(0xFF55B129);
  static const Color lime500 = Color(0xFF71CD32);
  static const Color lime400 = Color(0xFF93DA66);
  static const Color lime300 = Color(0xFFB5E699);
  static const Color lime200 = Color(0xFFD7F3CC);
  static const Color lime100 = Color(0xFFE9F9E6);
  static const Color lime50 = Color(0xFFF7FCF5);

  // Neutral & Ground grays
  static const Color neutral900 = Color(0xFF17181C);
  static const Color neutral800 = Color(0xFF17181C);
  static const Color neutral700 = Color(0xFF17181C);
  static const Color neutral600 = Color(0xFF17181C);
  static const Color neutral500 = Color(0xFF7A7A7A);
  static const Color neutral400 = Color(0xFFA3A3A3);
  static const Color neutral300 = Color(0xFFCCCCCC);
  static const Color neutral200 = Color(0xFFE6E6E6);
  static const Color neutral100 = Color(0xFFF4F4F4);
  static const Color neutral50 = Color(0xFFFAFAFA);

  static final ThemeData light = ThemeData(
    brightness: Brightness.light,

    // ==== Primary & Color Scheme ====
    primaryColor: lime500,
    colorScheme: ColorScheme.fromSeed(
      seedColor: lime500,
      primary: lime500,
      secondary: lime400,
      surface: Colors.white,
      error: Colors.redAccent,
      onPrimary: Colors.white,
      onSecondary: neutral900,
      onSurface: neutral900,
      onError: Colors.white,
      brightness: Brightness.light,
    ),

    // ==== Scaffold & Background ====
    scaffoldBackgroundColor: Colors.white,

    // ==== AppBar ====
    appBarTheme: const AppBarTheme(
      backgroundColor: Colors.white,
      foregroundColor: neutral900,
      elevation: 0,
      centerTitle: false,
      titleTextStyle: TextStyle(
        fontFamily: 'ClashGrotesk',
        fontSize: 24,
        fontWeight: FontWeight.w500,
        color: neutral900,
        fontFamilyFallback: ['Manrope'],
      ),
    ),

    // ==== Typography (Manrope + Clash Grotesk) ====
    fontFamily: GoogleFonts.manrope().fontFamily,
    textTheme: TextTheme(
      // Use local font family if provided via pubspec (ClashGrotesk),
      // and fall back to Manrope when not available.
      displayLarge: const TextStyle(
        fontFamily: 'ClashGrotesk',
        fontSize: 32,
        fontWeight: FontWeight.w500,
        color: neutral900,
        fontFamilyFallback: ['Manrope'],
      ),
      headlineLarge: GoogleFonts.manrope(
        fontSize: 24,
        fontWeight: FontWeight.w600,
        color: neutral900,
      ),
      titleLarge: GoogleFonts.manrope(
        fontSize: 20,
        fontWeight: FontWeight.w600,
        color: neutral900,
      ),
      bodyLarge: GoogleFonts.manrope(
        fontSize: 16,
        fontWeight: FontWeight.w400,
        color: neutral900,
      ),
      bodyMedium: GoogleFonts.manrope(
        fontSize: 14,
        fontWeight: FontWeight.w400,
        color: neutral700,
      ),
      labelLarge: GoogleFonts.manrope(
        fontSize: 14,
        fontWeight: FontWeight.w600,
        color: Colors.white,
      ),
    ),

    // ==== ElevatedButton (CTA – lime500 with rounded 12px) ====
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        backgroundColor: lime500,
        foregroundColor: Colors.white,
        elevation: 0,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 24),
        textStyle: GoogleFonts.manrope(
          fontSize: 16,
          fontWeight: FontWeight.w600,
        ),
      ),
    ),

    // ==== TextButton ====
    textButtonTheme: TextButtonThemeData(
      style: TextButton.styleFrom(
        foregroundColor: lime500,
        textStyle: GoogleFonts.manrope(
          fontSize: 14,
          fontWeight: FontWeight.w600,
        ),
      ),
    ),

    // ==== OutlinedButton ====
    outlinedButtonTheme: OutlinedButtonThemeData(
      style: OutlinedButton.styleFrom(
        side: const BorderSide(color: lime500, width: 2),
        foregroundColor: lime500,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      ),
    ),

    // ==== Input Decoration ====
    inputDecorationTheme: InputDecorationTheme(
      filled: true,
      fillColor: neutral100,
      contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(12),
        borderSide: BorderSide.none,
      ),
      enabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(12),
        borderSide: BorderSide.none,
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(12),
        borderSide: const BorderSide(color: lime500, width: 2),
      ),
      hintStyle: GoogleFonts.manrope(color: neutral500),
    ),

    // ==== Card ====
    cardTheme: CardThemeData(
      color: Colors.white,
      elevation: 0,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
    ),

    // ==== Divider ====
    dividerColor: neutral200,

    // ==== Icon Theme ====
    iconTheme: const IconThemeData(color: neutral700),
    primaryIconTheme: const IconThemeData(color: lime500),

    // ==== Bottom Navigation Bar ====
    bottomNavigationBarTheme: const BottomNavigationBarThemeData(
      backgroundColor: Colors.white,
      selectedItemColor: lime500,
      unselectedItemColor: neutral500,
      showUnselectedLabels: true,
    ),
  );
}
