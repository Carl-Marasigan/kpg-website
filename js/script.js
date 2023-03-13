// MESSAGE INPUT
const textarea = document.querySelector('.chatbox-message-input')
const chatboxForm = document.querySelector('.chatbox-message-form')


textarea.addEventListener('input', function () {
	let line = textarea.value.split('\n').length

	if(textarea.rows < 6 || line < 6) {
		textarea.rows = line
	}

	if(textarea.rows > 1) {
		chatboxForm.style.alignItems = 'flex-end'
	} else {
		chatboxForm.style.alignItems = 'center'
	}
})



// TOGGLE CHATBOX
const chatboxToggle = document.querySelector('.chatbox-toggle')
const chatboxMessage = document.querySelector('.chatbox-message-wrapper')

chatboxToggle.addEventListener('click', function () {
	chatboxMessage.classList.toggle('show')
})



// DROPDOWN TOGGLE
const dropdownToggle = document.querySelector('.chatbox-message-dropdown-toggle')
const dropdownMenu = document.querySelector('.chatbox-message-dropdown-menu')

dropdownToggle.addEventListener('click', function () {
	dropdownMenu.classList.toggle('show')
})

document.addEventListener('click', function (e) {
	if(!e.target.matches('.chatbox-message-dropdown, .chatbox-message-dropdown *')) {
		dropdownMenu.classList.remove('show')
	}
})







// CHATBOX MESSAGE
const chatboxMessageWrapper = document.querySelector('.chatbox-message-content')
const chatboxNoMessage = document.querySelector('.chatbox-message-no-message')

chatboxForm.addEventListener('submit', function (e) {
	e.preventDefault()

	if(isValid(textarea.value)) {
		writeMessage()
		setTimeout(autoReply, 1000)
	}
})



function addZero(num) {
	return num < 10 ? '0'+num : num
}

function writeMessage() {
	const today = new Date();
	let message = `
	  <div class="chatbox-message-item sent">
		<span class="chatbox-message-item-text">
		  ${textarea.value.trim().replace(/\n/g, '<br>\n')}
		</span>
		<span class="chatbox-message-item-time">${addZero(today.getHours())}:${addZero(today.getMinutes())}</span>
	  </div>
	`;
	chatboxMessageWrapper.insertAdjacentHTML('beforeend', message);
	chatboxForm.style.alignItems = 'center';
	textarea.rows = 1;
	textarea.focus();
	
	// Store user's message in separate variable
	const userMessage = textarea.value;
	textarea.value = '';
	
	chatboxNoMessage.style.display = 'none';
	scrollBottom();
  
	// Generate chatbot response using user's message
	generateChatbotResponse(userMessage);
  }
  
  function autoReply() {
	const today = new Date();
	let message = `
	`;
	chatboxMessageWrapper.insertAdjacentHTML('beforeend', message);
	scrollBottom();
  }
  
  function getResponse() {
	var selectBox = document.getElementById("chatbox-select");
	var selectedValue = selectBox.options[selectBox.selectedIndex].value;
  
	if (selectedValue === "Our company was founded in 1995 by Sakutaro Kanehira. KPGroup is dedicated to support the implementation and consistent application of the systems in all aspects, with the compliance to the principles and guidelines of Corporate Social Responsibility and the achievement of its goals on all level.") {
	  var response = "Our company was founded in 1995 by Sakutaro Kanehira. KPGroup is dedicated to support the implementation and consistent application of the systems in all aspects, with the compliance to the principles and guidelines of Corporate Social Responsibility and the achievement of its goals on all level.";
	  document.querySelector('.chatbox-message-no-message').innerHTML = response;
	} else if (selectedValue === "We offer a wide range of services, including financial advisory, information technology , kpg language school and more. You can find more information about our services on our website.") {
	  var response = "We offer a wide range of services, including financial advisory, information technology , kpg language school and more. You can find more information about our services on our website.";
	  document.querySelector('.chatbox-message-no-message').innerHTML = response;
	} else if (selectedValue === "For any other questions, you can contact us by phone at (+632) 555 1098 | 1667, by email at kpgroup@kp-grp.com, or by visiting our website and using the contact form.") {
	  var response = "For any other questions, you can contact us by phone at (+632) 555 1098 | 1667, by email at kpgroup@kp-grp.com, or by visiting our website and using the contact form.";
	  document.querySelector('.chatbox-message-no-message').innerHTML = response;
	}
  }


  function generateChatbotResponse(userInput) {
	const chatbotResponses = {
	  "What is your company's history?":"Our company was founded in 1995 by Sakutaro Kanehira. KPGroup is dedicated to support the implementation and consistent application of the systems in all aspects, with the compliance to the principles and guidelines of Corporate Social Responsibility and the achievement of its goals on all level.",
	  "What services do you offer?":"We offer a wide range of services, including financial advisory, information technology , kpg language school and more. You can find more information about our products on our website.",
	  "How can I contact you?":"For other questions, you can contact us by phone at (+632) 555 1098 | 1667, by email at kpgroup@kp-grp.com, or by visiting our website and using the contact form."
	  // Add more responses here
	};
	
	const response = chatbotResponses[userInput.toLowerCase()] || "Thank you!, For any other questions contact us or email us at kpgroup@kp-grp.com";
	
	

	const today = new Date();
	let message = `
	  <div class="chatbox-message-item received">
		<span class="chatbox-message-item-text">
		  ${response}
		</span>
		<span class="chatbox-message-item-time">${addZero(today.getHours())}:${addZero(today.getMinutes())}</span>
	  </div>
	`;
	
	chatboxMessageWrapper.insertAdjacentHTML('beforeend', message);
	scrollBottom();
  }

function scrollBottom() {
	chatboxMessageWrapper.scrollTo(0, chatboxMessageWrapper.scrollHeight)
}

function isValid(value) {
	let text = value.replace(/\n/g, '')
	text = text.replace(/\s/g, '')

	return text.length > 0
}


const audioElement = new Audio('kpg.mp3');
const audioButton = document.getElementById('audio-button');

audioButton.addEventListener('click', () => {
  audioElement.play();
});
