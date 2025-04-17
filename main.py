import cv2
import mediapipe as mp
import numpy as np

# Inicializa os módulos do MediaPipe
mp_drawing = mp.solutions.drawing_utils
mp_pose = mp.solutions.pose

# Inicializa a captura de vídeo (0 para a webcam padrão)
cap = cv2.VideoCapture(0)

# Verifica se a webcam foi aberta corretamente
if not cap.isOpened():
    print("Erro: Não foi possível abrir a webcam.")
    exit()

print("Pressione 'q' para sair.")

# Define as dimensões desejadas para a janela
desired_width = 1280
desired_height = 720

# Configura a instância do MediaPipe Pose
with mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5) as pose:
    while cap.isOpened():
        success, frame = cap.read()
        if not success:
            print("Ignorando frame vazio da câmera.")
            continue

        # Inverte o frame horizontalmente para visualização tipo espelho (opcional)
        frame = cv2.flip(frame, 1)

        frame.flags.writeable = False
        image_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = pose.process(image_rgb)

        frame.flags.writeable = True
        image_bgr = cv2.cvtColor(image_rgb, cv2.COLOR_RGB2BGR) # Ou use 'frame' se não inverteu

        # Desenha os landmarks da pose na imagem
        if results.pose_landmarks:
            mp_drawing.draw_landmarks(
                image_bgr,
                results.pose_landmarks,
                mp_pose.POSE_CONNECTIONS,
                mp_drawing.DrawingSpec(color=(245,117,66), thickness=2, circle_radius=2),
                mp_drawing.DrawingSpec(color=(245,66,230), thickness=2, circle_radius=2)
                )

        # --- NOVO: Redimensiona o frame para exibição ---
        # Usa INTER_LINEAR para um bom equilíbrio entre velocidade e qualidade
        resized_frame = cv2.resize(image_bgr, (desired_width, desired_height), interpolation=cv2.INTER_LINEAR)
        # --- FIM NOVO ---

        # Mostra a imagem redimensionada em uma janela
        # Certifique-se de usar a variável redimensionada aqui (resized_frame)
        cv2.imshow('MediaPipe Pose Detection - Janela Maior', resized_frame)

        if cv2.waitKey(5) & 0xFF == ord('q'):
            break

cap.release()
cv2.destroyAllWindows()
print("Programa finalizado.")