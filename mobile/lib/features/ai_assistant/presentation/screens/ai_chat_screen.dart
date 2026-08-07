import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

class AIChatScreen extends HookWidget {
  const AIChatScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final messages = useState<List<_ChatMessage>>([
      const _ChatMessage(
        fromAssistant: true,
        text:
            "Hi! I'm your personal shopping guru. If you have any questions about our products, ongoing sales, or need some beauty advice, feel free to ask. Happy shopping!",
      ),
    ]);
    final controller = useTextEditingController();
    final sending = useState(false);

    void sendMessage() {
      final text = controller.text.trim();
      if (text.isEmpty) return;
      messages.value = [
        ...messages.value,
        _ChatMessage(fromAssistant: false, text: text),
      ];
      controller.clear();
    }

    return Scaffold(
      appBar: AppBar(title: const Text('Assistant')),
      body: Column(
        children: [
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 16),
              itemCount: messages.value.length,
              itemBuilder: (context, index) {
                final m = messages.value[index];
                return _MessageBubble(message: m);
              },
            ),
          ),
          _InputBar(
            controller: controller,
            onSend: sendMessage,
            sending: sending.value,
          ),
        ],
      ),
    );
  }
}

class _ChatMessage {
  final bool fromAssistant;
  final String text;
  const _ChatMessage({required this.fromAssistant, required this.text});
}

class _MessageBubble extends StatelessWidget {
  final _ChatMessage message;
  const _MessageBubble({required this.message});

  @override
  Widget build(BuildContext context) {
    final isAssistant = message.fromAssistant;
    final bubbleColor = isAssistant
        ? Colors.grey.shade200
        : Theme.of(context).colorScheme.primary.withValues(alpha: .10);
    final align = isAssistant
        ? CrossAxisAlignment.start
        : CrossAxisAlignment.end;
    final avatar = Container(
      width: 34,
      height: 34,
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        gradient: const LinearGradient(
          colors: [Color(0xFF4CAF50), Color(0xFF8BC34A)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
      ),
      child: const Center(
        child: Icon(Icons.shopping_bag_outlined, color: Colors.white, size: 18),
      ),
    );

    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: Column(
        crossAxisAlignment: align,
        children: [
          if (isAssistant) avatar,
          if (isAssistant) const SizedBox(height: 8),
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: isAssistant
                ? MainAxisAlignment.start
                : MainAxisAlignment.end,
            children: [
              if (!isAssistant)
                Padding(
                  padding: const EdgeInsets.only(right: 8.0),
                  child: CircleAvatar(
                    radius: 17,
                    backgroundColor: Theme.of(context).colorScheme.primary,
                    child: const Icon(
                      Icons.person,
                      color: Colors.white,
                      size: 18,
                    ),
                  ),
                ),
              Flexible(
                child: Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 14,
                    vertical: 12,
                  ),
                  decoration: BoxDecoration(
                    color: bubbleColor,
                    borderRadius: BorderRadius.circular(16),
                  ),
                  child: Text(
                    message.text,
                    style: const TextStyle(fontSize: 14, height: 1.35),
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _InputBar extends StatelessWidget {
  final TextEditingController controller;
  final VoidCallback onSend;
  final bool sending;
  const _InputBar({
    required this.controller,
    required this.onSend,
    required this.sending,
  });

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      top: false,
      child: Padding(
        padding: const EdgeInsets.fromLTRB(12, 4, 12, 12),
        child: Row(
          children: [
            Expanded(
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 12),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(24),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withValues(alpha: .05),
                      blurRadius: 8,
                      offset: const Offset(0, 2),
                    ),
                  ],
                  border: Border.all(color: Colors.grey.shade300),
                ),
                child: Row(
                  children: [
                    Expanded(
                      child: TextField(
                        controller: controller,
                        decoration: const InputDecoration(
                          hintText: 'Write a message',
                          border: InputBorder.none,
                        ),
                        minLines: 1,
                        maxLines: 4,
                      ),
                    ),
                    IconButton(
                      icon: const Icon(Icons.mic_none_rounded),
                      onPressed: () {},
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(width: 10),
            GestureDetector(
              onTap: sending ? null : onSend,
              child: CircleAvatar(
                radius: 24,
                backgroundColor: Theme.of(context).colorScheme.primary,
                child: const Icon(Icons.send_rounded, color: Colors.white),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
