<script lang="ts">
  let navOpen = false;
</script>

<style>
  html {
    background-color: white;
  }
</style>

<nav class="sticky top-0 bg-white border-b shadow-sm z-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
    <h1 class="text-2xl font-bold text-blue-800">Jubilee Care ICT</h1>
    <div class="hidden md:flex space-x-8">
      <a href="#about" class="hover:text-blue-600 font-medium">About</a>
      <a href="#services" class="hover:text-blue-600 font-medium">Services</a>
      <a href="#projects" class="hover:text-blue-600 font-medium">Projects</a>
      <a href="#contact" class="hover:text-blue-600 font-medium">Contact</a>
    </div>
    <button class="md:hidden" on:click={() => navOpen = !navOpen}>
      <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  </div>
  {#if navOpen}
    <div class="md:hidden px-4 pb-4 space-y-2">
      <a href="#about" class="block text-gray-700">About</a>
      <a href="#services" class="block text-gray-700">Services</a>
      <a href="#projects" class="block text-gray-700">Projects</a>
      <a href="#contact" class="block text-gray-700">Contact</a>
    </div>
  {/if}
</nav>

<section class="bg-white py-20 text-center">
  <div class="max-w-3xl mx-auto px-6">
    <h2 class="text-4xl md:text-5xl font-bold text-blue-900 leading-tight">
      Empowering ICT Excellence Through Innovation
    </h2>
    <p class="mt-6 text-lg text-gray-700">
      Jubilee Care ICT Innovative Consult is committed to advancing digital literacy, offering premium training, and delivering innovative technology solutions across Nigeria.
    </p>
    <div class="mt-8">
      <a href="#contact" class="bg-blue-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-800 transition">
        Get Started
      </a>
    </div>
  </div>
</section>

<section id="about" class="py-16 bg-gray-50">
  <div class="max-w-5xl mx-auto px-6 text-center">
    <h3 class="text-3xl font-semibold text-blue-800 mb-4">Who We Are</h3>
    <p class="text-gray-700">
      Jubilee Care ICT Innovative Consult is a forward-thinking ICT firm dedicated to training, mentoring, and equipping individuals and organizations with cutting-edge digital skills and tools. Our goal is to build tech talent and foster innovation in underserved communities.
    </p>
  </div>
</section>

<!-- Additional sections to follow: Services, Projects, Testimonials, Contact, Footer -->
