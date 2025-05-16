import cv2
import mediapipe as mp
import numpy as np
import json

class DanceAnalysisCore:
    def __init__(self):
        self.mp_drawing = mp.solutions.drawing_utils
        self.mp_pose = mp.solutions.pose
        self.pose = self.mp_pose.Pose(
            min_detection_confidence=0.5,
            min_tracking_confidence=0.5
        )
        self.cap = None

    def initialize_camera(self, camera_id=0):
        """Inicializa a câmera com o ID especificado"""
        self.cap = cv2.VideoCapture(camera_id)
        return self.cap.isOpened()

    def process_frame(self):
        """Processa um frame da câmera e retorna os landmarks da pose"""
        if not self.cap or not self.cap.isOpened():
            return None

        success, frame = self.cap.read()
        if not success:
            return None

        # Processa o frame com MediaPipe
        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = self.pose.process(frame_rgb)

        if results.pose_landmarks:
            # Converte os landmarks para um formato serializável
            landmarks = []
            for landmark in results.pose_landmarks.landmark:
                landmarks.append({
                    'x': landmark.x,
                    'y': landmark.y,
                    'z': landmark.z,
                    'visibility': landmark.visibility
                })
            return json.dumps(landmarks)
        return None

    def release_camera(self):
        """Libera os recursos da câmera"""
        if self.cap:
            self.cap.release()
        self.pose.close()

# Função básica de resposta para comunicação com Electron
def handle_request(request_data):
    """
    Função básica de resposta para comunicação com Electron
    request_data: dict com os parâmetros da requisição
    """
    try:
        action = request_data.get('action')
        
        if action == 'initialize':
            core = DanceAnalysisCore()
            success = core.initialize_camera()
            return {'success': success, 'message': 'Câmera inicializada' if success else 'Erro ao inicializar câmera'}
            
        elif action == 'process_frame':
            core = DanceAnalysisCore()
            landmarks = core.process_frame()
            return {'success': True, 'landmarks': landmarks}
            
        elif action == 'release':
            core = DanceAnalysisCore()
            core.release_camera()
            return {'success': True, 'message': 'Recursos liberados'}
            
        else:
            return {'success': False, 'message': 'Ação não reconhecida'}
            
    except Exception as e:
        return {'success': False, 'message': f'Erro: {str(e)}'}

if __name__ == '__main__':
    # Teste básico da função
    test_request = {'action': 'initialize'}
    response = handle_request(test_request)
    print(response) 
