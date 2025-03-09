const videoElement = document.getElementById('video');
const statusMessage = document.getElementById('status-message');
const startBtn = document.getElementById('start-btn');
const spinner = document.getElementById('spinner');
const timerElement = document.getElementById('timer');

let faceDetected = false;

// Запуск камеры
navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
        // Добавляем поток в video-элемент
        videoElement.srcObject = stream;

        // Убедимся, что видео загрузилось
        videoElement.onloadedmetadata = () => {
            videoElement.play();
        };

        detectFace();
    })
    .catch((err) => {
        console.error('Error accessing camera: ', err);
        statusMessage.innerText = 'Unable to access the camera. Please ensure camera permissions are granted.';
    });

// Функция для детекции лица (простейшая имитация)
function detectFace() {
    setTimeout(() => {
        faceDetected = true;
        statusMessage.innerText = 'Face detected! Press the Start Verification button and keep the face in the frame for 5 seconds';
        startBtn.disabled = false;
    }, 3000);  // Имитируем обнаружение через 3 секунды
}

// Логика кнопки Start Verification
startBtn.addEventListener('click', () => {
    startBtn.disabled = true;
    statusMessage.innerText = 'Verification in progress...';
    spinner.style.display = 'block';

    let countdown = 5;
    timerElement.style.display = 'block';  // Показываем таймер

    const interval = setInterval(() => {
        countdown--;
        if (countdown > 0) {
            timerElement.innerText = countdown;
        } else {
            clearInterval(interval);
            spinner.style.display = 'none';
            timerElement.style.display = 'none'; // Скрываем таймер, когда отсчет завершен
            statusMessage.innerText = 'Verification completed successfully ✅';

            // Закрытие сайта через 5 секунд
            setTimeout(() => {
                window.close();
            }, 5000);
        }
    }, 1000);
});
