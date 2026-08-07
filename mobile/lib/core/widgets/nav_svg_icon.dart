import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';

class NavSvgIcon extends StatelessWidget {
  const NavSvgIcon(this.assetPath, {super.key});
  final String assetPath;

  @override
  Widget build(BuildContext context) {
    final theme = IconTheme.of(context);
    final size = theme.size;
    final color = theme.color;
    return SvgPicture.asset(
      assetPath,
      width: size,
      height: size,
      colorFilter: color != null
          ? ColorFilter.mode(color, BlendMode.srcIn)
          : null,
      package: null,
    );
  }
}
