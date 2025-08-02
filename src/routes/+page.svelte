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
      Official NIMC Front-End Partner – Delivering Secure Identity Services Nationwide.
    </h2>
    <p class="mt-6 text-lg text-gray-700">
      Jubilee Care ICT Innovative Consult is committed to advancing digital identity, ICT literacy, and delivering secure biometric and data solutions across Nigeria.
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
      Jubilee Care ICT Innovative Consult is a forward-thinking ICT and digital identity firm, officially recognized as a NIMC Front-End Partner (FEP). We specialize in secure NIN enrollment, verification, and modification services, while also offering premium tech training and digital transformation solutions to communities and institutions.
    </p>
  </div>
</section>

<section id="services" class="py-16 bg-white">
  <div class="max-w-6xl mx-auto px-6 text-center">
    <h3 class="text-3xl font-semibold text-blue-800 mb-10">Our Core Services</h3>
    <div class="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
      <div class="p-6 border rounded-lg shadow-sm">
        <h4 class="text-xl font-bold text-blue-700 mb-2">NIN Enrollment</h4>
        <p class="text-gray-600">As an accredited NIMC FEP, we facilitate National Identification Number (NIN) registration for citizens and residents across Nigeria.</p>
      </div>
      <div class="p-6 border rounded-lg shadow-sm">
        <h4 class="text-xl font-bold text-blue-700 mb-2">NIN Modification & Validation</h4>
        <p class="text-gray-600">We help you correct, update, and validate your NIN data securely and efficiently.</p>
      </div>
      <div class="p-6 border rounded-lg shadow-sm">
        <h4 class="text-xl font-bold text-blue-700 mb-2">ICT Training & Certification</h4>
        <p class="text-gray-600">Equipping individuals with in-demand ICT skills through professional training programs and certifications.</p>
      </div>
      <div class="p-6 border rounded-lg shadow-sm">
        <h4 class="text-xl font-bold text-blue-700 mb-2">Biometric & Identity Solutions</h4>
        <p class="text-gray-600">We provide innovative biometric capture and authentication services for both government and private institutions.</p>
      </div>
      <div class="p-6 border rounded-lg shadow-sm">
        <h4 class="text-xl font-bold text-blue-700 mb-2">NIN Slip Printing</h4>
        <p class="text-gray-600">Reprint your NIN slips conveniently through our authorized FEP centers or via secure portals.</p>
      </div>
      <div class="p-6 border rounded-lg shadow-sm">
        <h4 class="text-xl font-bold text-blue-700 mb-2">Consultancy & ICT Infrastructure</h4>
        <p class="text-gray-600">We consult, build, and maintain ICT systems for educational institutions, NGOs, and businesses.</p>
      </div>
    </div>
  </div>
</section>

<!-- Additional sections to follow: Projects, Testimonials, Contact, Footer -->
