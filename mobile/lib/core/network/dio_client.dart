// lib/core/network/dio_client.dart
import 'dart:io';

import 'package:dio/dio.dart';
import 'package:dio_cookie_manager/dio_cookie_manager.dart';
import 'package:cookie_jar/cookie_jar.dart';
import 'package:path_provider/path_provider.dart';

class DioClient {
  static final DioClient _instance = DioClient._internal();
  factory DioClient() => _instance;
  DioClient._internal();

  late Dio dio;
  late CookieJar cookieJar;

  Future<void> init() async {
    final resolvedBase = await _resolveBaseUrl();

    dio = Dio(
      BaseOptions(
        baseUrl: resolvedBase,
        connectTimeout: const Duration(seconds: 10),
        receiveTimeout: const Duration(seconds: 10),
        followRedirects: false,
        validateStatus: (status) => status != null && status < 500,
      ),
    );

    // Setup cookie jar
    final directory = await getApplicationDocumentsDirectory();
    final path = directory.path;
    cookieJar = PersistCookieJar(
      ignoreExpires: true,
      storage: FileStorage("$path/.cookies/"),
    );

    dio.interceptors.add(CookieManager(cookieJar));
  }

  Future<Map<String, dynamic>?> getUserFromResponse() async {
    final requestUri = Uri.parse(dio.options.baseUrl);
    final cookies = await cookieJar.loadForRequest(requestUri);

    Cookie? find(String name) {
      for (final c in cookies) {
        if (c.name == name) return c;
      }
      return null;
    }

    final accessCookie = find('access');
    final refreshCookie = find('refresh');

    if (accessCookie == null || refreshCookie == null) return null;

    return {'access': accessCookie.value, 'refresh': refreshCookie.value};
  }

  // Determine a workable base URL for emulator/device/desktop.
  Future<String> _resolveBaseUrl() async {
    // Allow build-time override: flutter run --dart-define=API_BASE_URL=http://192.168.1.5:8000/api/v1
    const override = String.fromEnvironment('API_BASE_URL');
    if (override.isNotEmpty) return override;

    // Default API path suffix. Change if your backend differs.
    const suffix = '/api/v1';

    if (Platform.isAndroid) {
      // Android emulator special loopback address to host machine.
      return 'http://10.0.2.2:8000$suffix';
    }

    if (Platform.isIOS) {
      // iOS Simulator can use localhost.
      return 'http://localhost:8000$suffix';
    }

    // Fallback for desktop/web dev using localhost.
    return 'http://localhost:8000$suffix';
  }
}
