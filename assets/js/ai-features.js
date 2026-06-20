/**
 * AI FEATURES JS – Workflow Animation + Chat
 */
(function() {
    'use strict';

    // ── Workflow Animation ──
    var startBtn = document.getElementById('startAnimation');
    var resetBtn = document.getElementById('resetAnimation');
    var steps = document.querySelectorAll('#workflowSteps .workflow-step');
    var progressSpan = document.getElementById('workflowProgress');
    var animationInterval = null;
    var currentStep = -1;

    function resetWorkflow() {
        if (animationInterval) {
            clearInterval(animationInterval);
            animationInterval = null;
        }
        currentStep = -1;
        steps.forEach(function(step) {
            var status = step.querySelector('.step-status');
            status.className = 'step-status pending';
            status.textContent = 'Pending';
            step.classList.remove('active', 'completed');
        });
        if (progressSpan) {
            progressSpan.textContent = '0%';
        }
    }

    function startAnimation() {
        if (animationInterval) {
            clearInterval(animationInterval);
            animationInterval = null;
        }
        resetWorkflow();

        var stepIndex = 0;
        var totalSteps = steps.length;

        function animateStep() {
            if (stepIndex >= totalSteps) {
                clearInterval(animationInterval);
                animationInterval = null;
                return;
            }

            var step = steps[stepIndex];
            var status = step.querySelector('.step-status');
            status.className = 'step-status active';
            status.textContent = 'Active';
            step.classList.add('active');

            var progress = Math.round(((stepIndex + 1) / totalSteps) * 100);
            if (progressSpan) {
                progressSpan.textContent = progress + '%';
            }

            if (stepIndex > 0) {
                var prevStep = steps[stepIndex - 1];
                var prevStatus = prevStep.querySelector('.step-status');
                prevStatus.className = 'step-status completed';
                prevStatus.textContent = 'Completed';
                prevStep.classList.remove('active');
                prevStep.classList.add('completed');
            }

            stepIndex++;

            if (stepIndex >= totalSteps) {
                if (progressSpan) {
                    progressSpan.textContent = '100%';
                }
                var lastStep = steps[totalSteps - 1];
                var lastStatus = lastStep.querySelector('.step-status');
                lastStatus.className = 'step-status completed';
                lastStatus.textContent = 'Completed';
                lastStep.classList.remove('active');
                lastStep.classList.add('completed');
            }
        }

        animationInterval = setInterval(animateStep, 800);
    }

    if (startBtn) {
        startBtn.addEventListener('click', startAnimation);
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', resetWorkflow);
    }

    // ── Chat send button ──
    var sendBtn = document.querySelector('.chat-send-btn');
    var chatInput = document.querySelector('.chat-input');

    if (sendBtn && chatInput) {
        sendBtn.addEventListener('click', function() {
            var message = chatInput.value.trim();
            if (message === '') return;

            var chatMessages = document.querySelector('.chat-messages');
            var msgDiv = document.createElement('div');
            msgDiv.className = 'chat-message';
            msgDiv.innerHTML =
                '<span class="chat-user">You</span><span class="chat-time">Just now</span><p>' +
                escapeHTML(message) + '</p>';
            chatMessages.appendChild(msgDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
            chatInput.value = '';
        });

        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendBtn.click();
            }
        });
    }

    function escapeHTML(text) {
        var div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // ── Reset workflow when switching to workflow tab ──
    var workflowTab = document.getElementById('workflow-tab');
    if (workflowTab) {
        workflowTab.addEventListener('shown.bs.tab', function() {
            resetWorkflow();
        });
    }

})();