// Load test performance metrics from localStorage
document.addEventListener('DOMContentLoaded', () => {
    const wpm = localStorage.getItem('wpm') || '0';
    const accuracy = localStorage.getItem('accuracy') || '0%';
    const time = localStorage.getItem('time') || '0s';

    document.getElementById('wpm').textContent = wpm;
    document.getElementById('accuracy').textContent = accuracy;
    document.getElementById('time').textContent = time;
}); 