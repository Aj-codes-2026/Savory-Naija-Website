const menuBtn = document.getElementById("mobile-menu-btn");
const menuIcon = document.getElementById("menu-icon");
const navMenu = document.getElementById("nav-menu");
const header = document.querySelector("header");
const revealEls = document.querySelectorAll(
  "#about .grid-div > *,#reviews .relative, #contact > *, footer > *",
);
const headings = document.querySelectorAll("#about h2, #choice h2");
const headings2 = document.querySelectorAll("#menu h2, #reviews h2");
const overlays = document.querySelectorAll(".overlay");
const heroImg = document.getElementById("hero-img");
const btnGrp = document.querySelectorAll("#button-group a");

const fullText = `Where exceptional taste meets a warm and inviting atmosphere. Enjoy freshly prepared meals crafted with care to give you a truly memorable dining experience.`;
const typewriterEl = document.getElementById("typewriter-text");
typewriterEl.classList.add("dark-text");

let charIndex = 0;

function typeNextCharacter() {
  if (charIndex < fullText.length) {
    typewriterEl.textContent += fullText[charIndex++];
    setTimeout(typeNextCharacter, 5);
  } else {
    typewriterEl.classList.add("bright");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(typeNextCharacter, 400);
});

revealEls.forEach((el, idx) => {
  el.classList.add("reveal");
  el.style.transitionDelay = `${(idx % 4) * 0.12}s`;
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 },
);
revealEls.forEach((el) => observer.observe(el));

document.querySelectorAll("#choice .w-full").forEach((item, idx) => {
  const cls = idx % 2 === 0 ? "reveal-left" : "reveal-right";
  item.classList.add(cls);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 },
  );

  observer.observe(item);
});

const observer2 = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.6,
  },
);
overlays.forEach((card) => observer2.observe(card));

const observer3 = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    entries[0].target.classList.add("expanded");
  }
}, {});
observer3.observe(heroImg);

headings.forEach((head) => {
  head.classList.add("reveal-heading");
  new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        head.classList.add("revealed-heading");
      }
    },
    { threshold: 0.5 },
  ).observe(head);
});

headings2.forEach((head) => {
  head.classList.add("reveal-heading2");
  new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        head.classList.add("revealed-heading2");
      }
    },
    { threshold: 0.5 },
  ).observe(head);
});

btnGrp.forEach((btn) => {
  new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        btn.classList.add("risen");
      }, 1550);
    }
  }, {}).observe(btn);
});

window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

menuBtn.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  menuIcon.className = isOpen ? "bx bx-x" : "bx bx-menu";
});

navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    menuIcon.className = "bx bx-menu";
  });
});

function showToast(msg, success = true) {
  const toast = document.createElement("div");
  toast.className = `toast ${success ? "toast-success" : "toast-error"}`;
  toast.textContent = msg;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add("toast-show"));
  setTimeout(() => {
    toast.classList.remove("toast-show");
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name-input").value.trim();
  const email = document.getElementById("email-input").value.trim();
  const phone = document.getElementById("number-input").value.trim();
  const guests = document.getElementById("guest-input").value.trim();
  const date = document.getElementById("date-input").value;
  const time = document.getElementById("time-input").value;
  const note = document.getElementById("comment-input").value.trim();

  if (!name || !email || !phone || !guests || !date || !time) {
    showToast("Please fill in all required fields.", false);
    return;
  }

  const subject = `Table Reservation - ${name}`;
  const body = `Name: ${name}%0AEmail: ${email}%0APhone: ${phone}%0AGuests: ${guests}%0ADate: ${date}%0ATime: ${time}%0ANote: ${note}`;

  window.location.href = `mailto:Savory@naija.com?subject=${subject}&body=${body}`;

  showToast("Reservation sent! We'll confirm shortly. 🍽️");
  e.target.reset();
});
