/**
 * ====================================================================
 * FormSubmit Activated Token: 5da131a3da0b25016675f5a9751c663c
 * ====================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const yearEl = document.getElementById("current-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const typingTextEl = document.getElementById("typing-text");
  if (typingTextEl) {
    const roles = [
      "Frontend Developer",
      "AI Prompt Engineer",
      "Cloud Learner",
      "Google Student Ambassador",
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function runTypingLoop() {
      const currentWord = roles[roleIndex];

      if (isDeleting) {
        typingTextEl.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 45;
      } else {
        typingTextEl.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 110;
      }

      if (!isDeleting && charIndex === currentWord.length) {
        typingSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 400;
      }

      setTimeout(runTypingLoop, typingSpeed);
    }

    runTypingLoop();
  }

  const revealElements = document.querySelectorAll(".reveal-on-scroll");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      },
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add("revealed"));
  }

  const navbar = document.getElementById("navbar");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");
  const backToTopBtn = document.getElementById("back-to-top");

  function updateScrollState() {
    const scrollY = window.scrollY;

    if (scrollY > 50) {
      navbar?.classList.add("scrolled");
    } else {
      navbar?.classList.remove("scrolled");
    }

    if (scrollY > 400) {
      backToTopBtn?.classList.add("visible");
    } else {
      backToTopBtn?.classList.remove("visible");
    }

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 130;
      const sectionId = section.getAttribute("id");

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", updateScrollState, { passive: true });
  updateScrollState();

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  const hamburgerBtn = document.getElementById("hamburger-btn");
  const navMenu = document.getElementById("nav-menu");
  const mobileOverlay = document.getElementById("mobile-overlay");

  function toggleMobileMenu() {
    const isExpanded = hamburgerBtn.classList.toggle("active");
    navMenu.classList.toggle("open");
    mobileOverlay.classList.toggle("open");
    hamburgerBtn.setAttribute("aria-expanded", isExpanded ? "true" : "false");
    document.body.style.overflow = isExpanded ? "hidden" : "";
  }

  function closeMobileMenu() {
    hamburgerBtn?.classList.remove("active");
    navMenu?.classList.remove("open");
    mobileOverlay?.classList.remove("open");
    hamburgerBtn?.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener("click", toggleMobileMenu);
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener("click", closeMobileMenu);
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        closeMobileMenu();
      }
    });
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navMenu?.classList.contains("open")) {
      closeMobileMenu();
    }
  });

  const skillsSection = document.getElementById("skills");
  const skillBars = document.querySelectorAll(".skill-progress-bar");
  let skillsAnimated = false;

  const skillsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !skillsAnimated) {
          skillsAnimated = true;
          skillBars.forEach((bar) => {
            const target = bar.getAttribute("data-progress");
            if (target) {
              bar.style.width = `${target}%`;
            }
          });
          skillsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 },
  );

  if (skillsSection) {
    skillsObserver.observe(skillsSection);
  }

  const aboutSection = document.getElementById("about");
  const statNumElements = document.querySelectorAll(".stat-num");
  let statsTriggered = false;

  function countUp(el, target, duration = 1800) {
    let startTimestamp = null;
    const startVal = 0;

    function step(timestamp) {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 4);
      const val = Math.floor(ease * (target - startVal) + startVal);
      el.textContent = val.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target.toLocaleString();
      }
    }

    requestAnimationFrame(step);
  }

  const aboutObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !statsTriggered) {
          statsTriggered = true;
          statNumElements.forEach((numEl) => {
            const target = parseInt(numEl.getAttribute("data-target"), 10);
            if (!isNaN(target)) {
              countUp(numEl, target);
            }
          });
          aboutObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.25 },
  );

  if (aboutSection) {
    aboutObserver.observe(aboutSection);
  }

  const flipCards = document.querySelectorAll(".project-flip-card");
  flipCards.forEach((card) => {
    card.addEventListener("click", (e) => {
      if (e.target.closest("a") || e.target.closest("button")) {
        return;
      }
      if (window.innerWidth <= 1024) {
        card.classList.toggle("flipped");
      }
    });
  });

  const contactForm = document.getElementById("contact-form");
  const submitBtn = document.getElementById("submit-btn");
  const formToast = document.getElementById("form-toast");

  if (contactForm) {
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const subjectInput = document.getElementById("subject");
    const messageInput = document.getElementById("message");

    function validateEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(String(email).trim().toLowerCase());
    }

    function setFieldError(input, errorId, message) {
      input.classList.add("is-invalid");
      const errEl = document.getElementById(errorId);
      if (errEl) errEl.textContent = message;
    }

    function clearFieldError(input, errorId) {
      input.classList.remove("is-invalid");
      const errEl = document.getElementById(errorId);
      if (errEl) errEl.textContent = "";
    }

    [nameInput, emailInput, subjectInput, messageInput].forEach((field) => {
      if (field) {
        field.addEventListener("input", () => {
          clearFieldError(field, `${field.id}-error`);
          if (formToast) {
            formToast.className = "form-toast";
            formToast.style.display = "none";
            formToast.innerHTML = "";
          }
        });
      }
    });

    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      let isValid = true;
      const rawName = nameInput.value.trim();
      const rawEmail = emailInput.value.trim();
      const rawSubject = subjectInput.value.trim();
      const rawMessage = messageInput.value.trim();

      if (!rawName) {
        setFieldError(nameInput, "name-error", "Please enter your name.");
        isValid = false;
      } else if (rawName.length < 2) {
        setFieldError(
          nameInput,
          "name-error",
          "Name must be at least 2 characters.",
        );
        isValid = false;
      } else {
        clearFieldError(nameInput, "name-error");
      }

      if (!rawEmail) {
        setFieldError(
          emailInput,
          "email-error",
          "Please enter your email address.",
        );
        isValid = false;
      } else if (!validateEmail(rawEmail)) {
        setFieldError(
          emailInput,
          "email-error",
          "Please enter a valid email format.",
        );
        isValid = false;
      } else {
        clearFieldError(emailInput, "email-error");
      }

      if (!rawSubject) {
        setFieldError(subjectInput, "subject-error", "Please enter a subject.");
        isValid = false;
      } else {
        clearFieldError(subjectInput, "subject-error");
      }

      if (!rawMessage) {
        setFieldError(
          messageInput,
          "message-error",
          "Please write your message.",
        );
        isValid = false;
      } else if (rawMessage.length < 10) {
        setFieldError(
          messageInput,
          "message-error",
          "Message should be at least 10 characters.",
        );
        isValid = false;
      } else {
        clearFieldError(messageInput, "message-error");
      }

      if (!isValid) {
        const firstErrorField = contactForm.querySelector(".is-invalid");
        if (firstErrorField) firstErrorField.focus();
        return;
      }

      submitBtn.classList.add("loading");
      submitBtn.disabled = true;

      const FORMSUBMIT_TOKEN = "5da131a3da0b25016675f5a9751c663c";
      const FORMSUBMIT_URL = `https://formsubmit.co/ajax/${FORMSUBMIT_TOKEN}`;

      const timeStamp = new Date().toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      const uniqueSubject = `[Portfolio] ${rawSubject} - from ${rawName} [${timeStamp}]`;
      const mailBody = `Hi Deepak,\n\n${rawMessage}\n\n------------------------------\nFrom: ${rawName}\nEmail: ${rawEmail}\nTime: ${timeStamp}\nSource: Portfolio Website`;

      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=rajpootdeepak1839@gmail.com&su=${encodeURIComponent(uniqueSubject)}&body=${encodeURIComponent(mailBody)}`;
      const mailtoUrl = `mailto:rajpootdeepak1839@gmail.com?subject=${encodeURIComponent(uniqueSubject)}&body=${encodeURIComponent(mailBody)}`;

      const isFileMode = window.location.protocol === "file:";

      if (isFileMode) {
        submitBtn.classList.remove("loading");
        submitBtn.disabled = false;
        window.open(gmailUrl, "_blank");

        if (formToast) {
          formToast.className = "form-toast success";
          formToast.style.display = "flex";
          formToast.innerHTML = `
            <div class="toast-header-row">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <span>Message Opened in Gmail!</span>
            </div>
            <p style="margin: 0.35rem 0; color: #cbd5e1; font-size: 0.92rem;">
              Local file mode (file:///) detected. A Gmail tab has been opened with your message pre-filled — just click <strong>Send</strong>!
            </p>
            <div class="toast-actions-row">
              <a href="${gmailUrl}" target="_blank" rel="noopener noreferrer" class="toast-action-btn toast-btn-gmail">
                Open in Gmail (1-Click)
              </a>
              <a href="${mailtoUrl}" class="toast-action-btn toast-btn-client">
                Send via Mail App
              </a>
            </div>
          `;
        }
        contactForm.reset();
        return;
      }

      console.log("[Contact Form] Dispatching real email to FormSubmit...", {
        name: rawName,
        email: rawEmail,
        subject: uniqueSubject,
      });

      const payload = {
        name: rawName,
        email: rawEmail,
        subject: rawSubject,
        message: rawMessage,
        _subject: uniqueSubject,
        _captcha: "false",
        _template: "table",
        _replyto: rawEmail,
      };

      try {
        const response = await fetch(FORMSUBMIT_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        });

        const data = await response.json();
        submitBtn.classList.remove("loading");
        submitBtn.disabled = false;
        console.log("[Contact Form] FormSubmit response:", data);

        if (response.ok && (data.success === "true" || data.success === true)) {
          if (formToast) {
            formToast.className = "form-toast success";
            formToast.style.display = "flex";
            formToast.innerHTML = `
              <div class="toast-header-row">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span>Message Sent Successfully!</span>
              </div>
              <p style="margin: 0.35rem 0; color: #cbd5e1; font-size: 0.92rem;">
                Thank you, <strong>${escapeHtml(rawName)}</strong>! Your message has been sent to Deepak successfully. He will get back to you soon.
              </p>
              <div style="font-size: 0.8rem; color: #94a3b8; margin-top: 4px;">
                Dispatched at: <strong>${timeStamp}</strong>
              </div>
            `;
          }

          contactForm.reset();

          setTimeout(() => {
            if (formToast && formToast.classList.contains("success")) {
              formToast.className = "form-toast";
              formToast.style.display = "none";
              formToast.innerHTML = "";
            }
          }, 9000);
        } else {
          throw new Error(data.message || "Submission error");
        }
      } catch (error) {
        console.error("Contact form error:", error);
        submitBtn.classList.remove("loading");
        submitBtn.disabled = false;

        if (formToast) {
          formToast.className = "form-toast error";
          formToast.style.display = "flex";
          formToast.innerHTML = `
            <div>
              <span>Sorry, your message could not be sent automatically.</span>
              <div style="margin-top:4px;font-size:0.85rem;">
                <a href="${gmailUrl}" target="_blank" rel="noopener noreferrer" style="color:#00f5d4;text-decoration:underline;">Send it via Gmail instead</a>
              </div>
            </div>`;
        }
      }
    });
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  const canvas = document.getElementById("bg-canvas");
  if (
    canvas &&
    window.matchMedia("(prefers-reduced-motion: no-preference)").matches
  ) {
    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let resizeTimer;
    window.addEventListener(
      "resize",
      () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          width = canvas.width = window.innerWidth;
          height = canvas.height = window.innerHeight;
        }, 100);
      },
      { passive: true },
    );

    const count = Math.min(Math.floor((width * height) / 20000), 65);
    const particles = [];

    class CyberParticle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.radius = Math.random() * 2 + 0.8;
        this.isTeal = Math.random() > 0.4;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.isTeal
          ? "rgba(0, 245, 212, 0.45)"
          : "rgba(168, 85, 247, 0.4)";
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.isTeal ? "#00f5d4" : "#a855f7";
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    for (let i = 0; i < count; i++) {
      particles.push(new CyberParticle());
    }

    function renderCanvas() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);

          if (dist < 115) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);

            const alpha = (1 - dist / 115) * 0.16;
            ctx.strokeStyle = particles[i].isTeal
              ? `rgba(0, 245, 212, ${alpha})`
              : `rgba(168, 85, 247, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(renderCanvas);
    }

    renderCanvas();
  }
});
