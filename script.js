function initMedia() {
  const backgroundMusic = document.getElementById('background-music');
  const backgroundVideo = document.getElementById('background');
  if (!backgroundMusic || !backgroundVideo) return;
  backgroundMusic.volume = 0.3;
  backgroundVideo.volume = 0.3;
  backgroundVideo.muted = true; // will be unmuted after user interaction
  backgroundVideo.play().catch(err => {
    console.warn('Autoplay video failed (will retry after interaction):', err);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const startScreen = document.getElementById('start-screen');
  const startText = document.getElementById('start-text');
  const profileName = document.getElementById('profile-name');
  const profileBio = document.getElementById('profile-bio');
  const visitorCount = document.getElementById('visitor-count');
  const backgroundMusic = document.getElementById('background-music');
  // Removed extra theme/audio elements (single audio track setup)
  const resultsButtonContainer = document.getElementById('results-button-container');
  const resultsButton = document.getElementById('results-theme');
  // Old volume/transparency elements removed
  const muteBtn = document.getElementById('mute-btn');
  const backgroundVideo = document.getElementById('background');
  const hackerOverlay = document.getElementById('hacker-overlay'); // kept for potential future use
  const snowOverlay = document.getElementById('snow-overlay'); // kept for potential future use
  const glitchOverlay = document.querySelector('.glitch-overlay');
  const profileBlock = document.getElementById('profile-block');
  const skillsBlock = document.getElementById('skills-block');
  const pythonBar = document.getElementById('python-bar');
  const cppBar = document.getElementById('cpp-bar');
  const csharpBar = document.getElementById('csharp-bar');
  const pythonPercent = document.getElementById('python-percent');
  const cppPercent = document.getElementById('cpp-percent');
  const csharpPercent = document.getElementById('csharp-percent');
  const resultsHint = document.getElementById('results-hint');
  const profilePicture = document.querySelector('.profile-picture');
  const profileContainer = document.querySelector('.profile-container');
  const socialIcons = document.querySelectorAll('.social-icon');
  const badges = document.querySelectorAll('.badge');
  const githubLink = document.querySelector('.social-links a[href*="github.com"]');

  
  const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;


  const startMessage = "CLICK TO SEE THE WORLD";
  let startTextContent = '';
  let startIndex = 0;
  let startCursorVisible = true;

  function typeWriterStart() {
    if (startIndex < startMessage.length) {
      startTextContent = startMessage.slice(0, startIndex + 1);
      startIndex++;
      startText.textContent = startTextContent + (startCursorVisible ? '|' : ' ');
      setTimeout(typeWriterStart, 100);
    }
  }


  setInterval(() => {
    startCursorVisible = !startCursorVisible;
    startText.textContent = startTextContent + (startCursorVisible ? '|' : ' ');
  }, 500);


  function initializeVisitorCounter() {
    let totalVisitors = localStorage.getItem('totalVisitorCount');
    if (!totalVisitors) {
      totalVisitors = 921234;
      localStorage.setItem('totalVisitorCount', totalVisitors);
    } else {
      totalVisitors = parseInt(totalVisitors);
    }

    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      totalVisitors++;
      localStorage.setItem('totalVisitorCount', totalVisitors);
      localStorage.setItem('hasVisited', 'true');
    }

    visitorCount.textContent = totalVisitors.toLocaleString();
  }


  initializeVisitorCounter();


  startScreen.addEventListener('click', () => {
    startScreen.classList.add('hidden');
    backgroundMusic.muted = false;
    backgroundVideo.muted = false;
    backgroundMusic.play().catch(err => {
      console.error("Failed to play music after start screen click:", err);
    });
    backgroundVideo.play().catch(err => {
      console.error("Failed to play video after start screen click:", err);
    });
    console.log('[Video Debug] state after click:', {
      readyState: backgroundVideo.readyState,
      networkState: backgroundVideo.networkState,
      error: backgroundVideo.error
    });
    profileBlock.classList.remove('hidden');
    // resultsButtonContainer left hidden (disabled feature)
    gsap.fromTo(profileBlock,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out', onComplete: () => {
        profileBlock.classList.add('profile-appear');
        profileContainer.classList.add('orbit');
      }}
    );
    typeWriterName();
    typeWriterBio();
  });

  startScreen.addEventListener('touchstart', (e) => {
    e.preventDefault();
    startScreen.classList.add('hidden');
    backgroundMusic.muted = false;
    backgroundVideo.muted = false;
    backgroundMusic.play().catch(err => {
      console.error("Failed to play music after start screen touch:", err);
    });
    backgroundVideo.play().catch(err => {
      console.error("Failed to play video after start screen touch:", err);
    });
    console.log('[Video Debug] state after touchstart:', {
      readyState: backgroundVideo.readyState,
      networkState: backgroundVideo.networkState,
      error: backgroundVideo.error
    });
    profileBlock.classList.remove('hidden');
    // resultsButtonContainer left hidden (disabled feature)
    gsap.fromTo(profileBlock,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out', onComplete: () => {
        profileBlock.classList.add('profile-appear');
        profileContainer.classList.add('orbit');
      }}
    );
    typeWriterName();
    typeWriterBio();
  });


  const name = "Choko";
  let nameText = '';
  let nameIndex = 0;
  let isNameDeleting = false;
  let nameCursorVisible = true;

  function typeWriterName() {
    if (!isNameDeleting && nameIndex < name.length) {
      nameText = name.slice(0, nameIndex + 1);
      nameIndex++;
    } else if (isNameDeleting && nameIndex > 0) {
      nameText = name.slice(0, nameIndex - 1);
      nameIndex--;
    } else if (nameIndex === name.length) {
      isNameDeleting = true;
      setTimeout(typeWriterName, 10000);
      return;
    } else if (nameIndex === 0) {
      isNameDeleting = false;
    }
    profileName.textContent = nameText + (nameCursorVisible ? '|' : ' ');
    if (Math.random() < 0.1) {
      profileName.classList.add('glitch');
      setTimeout(() => profileName.classList.remove('glitch'), 200);
    }
    setTimeout(typeWriterName, isNameDeleting ? 150 : 300);
  }

  setInterval(() => {
    nameCursorVisible = !nameCursorVisible;
    profileName.textContent = nameText + (nameCursorVisible ? '|' : ' ');
  }, 500);


  const bioMessages = [
    "You wassup",
    "\"F*ck, World!\""
  ];
  let bioText = '';
  let bioIndex = 0;
  let bioMessageIndex = 0;
  let isBioDeleting = false;
  let bioCursorVisible = true;

  function typeWriterBio() {
    if (!isBioDeleting && bioIndex < bioMessages[bioMessageIndex].length) {
      bioText = bioMessages[bioMessageIndex].slice(0, bioIndex + 1);
      bioIndex++;
    } else if (isBioDeleting && bioIndex > 0) {
      bioText = bioMessages[bioMessageIndex].slice(0, bioIndex - 1);
      bioIndex--;
    } else if (bioIndex === bioMessages[bioMessageIndex].length) {
      isBioDeleting = true;
      setTimeout(typeWriterBio, 2000);
      return;
    } else if (bioIndex === 0 && isBioDeleting) {
      isBioDeleting = false;
      bioMessageIndex = (bioMessageIndex + 1) % bioMessages.length;
    }
    profileBio.textContent = bioText + (bioCursorVisible ? '|' : ' ');
    if (Math.random() < 0.1) {
      profileBio.classList.add('glitch');
      setTimeout(() => profileBio.classList.remove('glitch'), 200);
    }
    setTimeout(typeWriterBio, isBioDeleting ? 75 : 150);
  }

  setInterval(() => {
    bioCursorVisible = !bioCursorVisible;
    profileBio.textContent = bioText + (bioCursorVisible ? '|' : ' ');
  }, 500);


  // New minimal mute toggle
  let isMuted = false;
  function refreshMuteBtn() {
    if (!muteBtn) return;
    muteBtn.textContent = isMuted ? '🔇' : '🔊';
  }
  if (muteBtn) {
    muteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      isMuted = !isMuted;
      backgroundMusic.muted = isMuted;
      if (backgroundVideo) backgroundVideo.muted = isMuted;
      refreshMuteBtn();
    });
    muteBtn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      e.stopPropagation();
      isMuted = !isMuted;
      backgroundMusic.muted = isMuted;
      if (backgroundVideo) backgroundVideo.muted = isMuted;
      refreshMuteBtn();
    });
  }
  refreshMuteBtn();

  // Video diagnostics
  if (backgroundVideo) {
    backgroundVideo.addEventListener('error', () => {
      console.error('[Video Debug] error event:', backgroundVideo.error);
    });
    backgroundVideo.addEventListener('loadeddata', () => {
      console.log('[Video Debug] loadeddata: first frame available');
    });
    backgroundVideo.addEventListener('canplay', () => {
      console.log('[Video Debug] canplay fired');
    });
    backgroundVideo.addEventListener('playing', () => {
      console.log('[Video Debug] playing fired');
    });
    backgroundVideo.addEventListener('stalled', () => {
      console.warn('[Video Debug] stalled event');
    });
    backgroundVideo.addEventListener('waiting', () => {
      console.warn('[Video Debug] waiting for more data');
    });
  }
 
  function handleTilt(e, element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    let clientX, clientY;

    if (e.type === 'touchmove') {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const mouseX = clientX - centerX;
    const mouseY = clientY - centerY;

    const maxTilt = 15;
    const tiltX = (mouseY / rect.height) * maxTilt;
    const tiltY = -(mouseX / rect.width) * maxTilt;

    gsap.to(element, {
      rotationX: tiltX,
      rotationY: tiltY,
      duration: 0.3,
      ease: 'power2.out',
      transformPerspective: 1000
    });
  }

  profileBlock.addEventListener('mousemove', (e) => handleTilt(e, profileBlock));
  profileBlock.addEventListener('touchmove', (e) => {
    e.preventDefault();
    handleTilt(e, profileBlock);
  });

  skillsBlock.addEventListener('mousemove', (e) => handleTilt(e, skillsBlock));
  skillsBlock.addEventListener('touchmove', (e) => {
    e.preventDefault();
    handleTilt(e, skillsBlock);
  });

  profileBlock.addEventListener('mouseleave', () => {
    gsap.to(profileBlock, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.5,
      ease: 'power2.out'
    });
  });
  profileBlock.addEventListener('touchend', () => {
    gsap.to(profileBlock, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.5,
      ease: 'power2.out'
    });
  });

  skillsBlock.addEventListener('mouseleave', () => {
    gsap.to(skillsBlock, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.5,
      ease: 'power2.out'
    });
  });
  skillsBlock.addEventListener('touchend', () => {
    gsap.to(skillsBlock, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.5,
      ease: 'power2.out'
    });
  });


  profilePicture.addEventListener('mouseenter', () => {
    glitchOverlay.style.opacity = '1';
    setTimeout(() => {
      glitchOverlay.style.opacity = '0';
    }, 500);
  });

  // Badge hover glitch effect
  badges.forEach(badge => {
    badge.addEventListener('mouseenter', () => {
      badge.classList.add('glitch');
      setTimeout(() => badge.classList.remove('glitch'), 250);
    });
    badge.addEventListener('touchstart', () => {
      badge.classList.add('glitch');
      setTimeout(() => badge.classList.remove('glitch'), 250);
    });
  });


  profilePicture.addEventListener('click', () => {
    profileContainer.classList.remove('fast-orbit');
    profileContainer.classList.remove('orbit');
    void profileContainer.offsetWidth;
    profileContainer.classList.add('fast-orbit');
    setTimeout(() => {
      profileContainer.classList.remove('fast-orbit');
      void profileContainer.offsetWidth;
      profileContainer.classList.add('orbit');
    }, 500);
  });

  profilePicture.addEventListener('touchstart', (e) => {
    e.preventDefault();
    profileContainer.classList.remove('fast-orbit');
    profileContainer.classList.remove('orbit');
    void profileContainer.offsetWidth;
    profileContainer.classList.add('fast-orbit');
    setTimeout(() => {
      profileContainer.classList.remove('fast-orbit');
      void profileContainer.offsetWidth;
      profileContainer.classList.add('orbit');
    }, 500);
  });

 
  let isShowingSkills = false;
  let githubSkillPercents = { python: 87, cpp: 75, csharp: 80 };

  async function loadGithubSkills(username) {
    try {
      const reposResp = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
      if (!reposResp.ok) return;
      const repos = await reposResp.json();
      const languageTotals = {};
      for (const repo of repos) {
        if (!repo.languages_url) continue;
        try {
          const langResp = await fetch(repo.languages_url);
          if (!langResp.ok) continue;
          const langs = await langResp.json();
          for (const [lang, bytes] of Object.entries(langs)) {
            languageTotals[lang] = (languageTotals[lang] || 0) + bytes;
          }
        } catch {}
      }
      const targets = { python: 'Python', cpp: 'C++', csharp: 'C#' };
      let sumTargets = 0;
      for (const key in targets) {
        const name = targets[key];
        sumTargets += languageTotals[name] || 0;
      }
      if (sumTargets === 0) return; // keep defaults if no data
      for (const key in targets) {
        const name = targets[key];
        const val = languageTotals[name] || 0;
        githubSkillPercents[key] = Math.round((val / sumTargets) * 100);
      }
      updateSkillDisplay();
    } catch {}
  }

  function updateSkillDisplay() {
    pythonPercent.textContent = githubSkillPercents.python + '%';
    cppPercent.textContent = githubSkillPercents.cpp + '%';
    csharpPercent.textContent = githubSkillPercents.csharp + '%';
  }

  loadGithubSkills('vyazovmykola');
  // Results button event handlers removed (feature disabled)

  // Slider interaction suppression removed; no sliders active.


  typeWriterStart();
});