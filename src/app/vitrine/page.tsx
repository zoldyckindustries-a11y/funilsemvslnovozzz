"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Star,
  CheckCircle2,
  ChevronDown,
  ShoppingBag,
  Award,
  HeartPulse,
  Sparkles,
  Lock,
  PackageCheck,
  CreditCard,
  Flame,
} from "lucide-react";

export default function VitrineTravesseiros() {
  const [faqAberto, setFaqAberto] = useState<number | null>(null);
  const [quantidade, setQuantidade] = useState<number>(1);
  const [tamanho, setTamanho] = useState<string>("padrao");

  const toggleFaq = (index: number) => {
    setFaqAberto(faqAberto === index ? null : index);
  };

  const precoUnitario = 119.9;
  const precoTotal = (precoUnitario * quantidade).toFixed(2).replace(".", ",");
  const parcela = ((precoUnitario * quantidade) / 12).toFixed(2).replace(".", ",");

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-indigo-500 selection:text-white">
      {/* Top Banner */}
      <div className="bg-emerald-600 text-white text-xs sm:text-sm font-medium py-2 px-4 text-center flex items-center justify-center gap-2 shadow-inner">
        <Truck className="w-4 h-4" />
        <span>
          <strong>FRETE GRÁTIS</strong> PARA TODO O BRASIL NAS PRÓXIMAS 2 HORAS | 30 DIAS DE TESTE
        </span>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-800 flex items-center justify-center text-white font-black text-xl shadow-md">
              S
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900">
                Sono<span className="text-indigo-600">Nuvem</span>
              </span>
              <span className="block text-[9px] uppercase tracking-wider text-slate-400 font-bold -mt-1">
                Ortopedia & Conforto
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
              <a href="#beneficios" className="hover:text-indigo-600 transition">
                Benefícios
              </a>
              <a href="#avaliacoes" className="hover:text-indigo-600 transition">
                Depoimentos
              </a>
              <a href="#faq" className="hover:text-indigo-600 transition">
                Dúvidas
              </a>
            </div>
            <a
              href="#comprar"
              className="flex items-center gap-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold px-3 py-2 rounded-lg text-sm transition border border-indigo-200"
            >
              <ShoppingBag className="w-4 h-4 text-indigo-600" />
              <span>Garantir Oferta</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* Imagens do Produto */}
          <div className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-xl aspect-4/3 flex items-center justify-center p-6 group">
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
                <span className="bg-emerald-600 text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow">
                  Pronta Entrega
                </span>
                <span className="bg-amber-500 text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow flex items-center gap-1">
                  <Flame className="w-3 h-3 fill-current" /> 52% OFF HOJE
                </span>
              </div>

              {/* Mockup do Travesseiro Ortopédico */}
              <div className="w-full h-full flex flex-col items-center justify-center relative">
                <div className="w-80 h-44 bg-gradient-to-br from-slate-100 via-white to-slate-200 rounded-3xl shadow-2xl border-4 border-indigo-50 relative flex items-center justify-center transform transition duration-500 group-hover:scale-105">
                  <div className="absolute inset-x-8 top-3 h-8 bg-indigo-50/50 rounded-full blur-[2px]" />
                  <div className="absolute inset-x-12 bottom-4 h-6 bg-slate-300/40 rounded-full blur-xs" />
                  <div className="text-center z-10">
                    <p className="text-xs uppercase tracking-widest text-indigo-700 font-black">
                      SonoNuvem®
                    </p>
                    <p className="text-[11px] text-slate-400 font-medium">
                      Memory Foam NASA + Gel Refrescante
                    </p>
                    <div className="mt-2 inline-flex items-center gap-1 bg-white/90 border border-slate-200 px-2.5 py-1 rounded-md text-[10px] text-slate-700 font-semibold shadow-xs">
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      Espuma Viscoelástica Ortopédica
                    </div>
                  </div>
                </div>
                <div className="w-72 h-4 bg-slate-300/40 blur-md rounded-full mt-4" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white rounded-xl p-3 border border-indigo-200 shadow-xs text-center">
                <div className="text-xs font-bold text-slate-800">Capa de Bambu</div>
                <div className="text-[10px] text-slate-500">Antiácaro & Lavável</div>
              </div>
              <div className="bg-white rounded-xl p-3 border border-slate-200 shadow-xs text-center">
                <div className="text-xs font-bold text-slate-800">Espuma NASA</div>
                <div className="text-[10px] text-slate-500">Não Deforma</div>
              </div>
              <div className="bg-white rounded-xl p-3 border border-slate-200 shadow-xs text-center">
                <div className="text-xs font-bold text-slate-800">Cervical Ergo</div>
                <div className="text-[10px] text-slate-500">Alinhamento Perfeito</div>
              </div>
            </div>
          </div>

          {/* Dados e Compra */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-bold text-slate-700">4.9 / 5.0</span>
                <span className="text-xs text-slate-400">
                  (14.892 avaliações no Brasil)
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                Travesseiro Ortopédico Cervical SonoNuvem® Anatômico
              </h1>
              <p className="text-sm text-slate-600 mt-2">
                Projetado por especialistas em postura e medicina do sono para eliminar
                dores no pescoço, ombros e coluna desde a primeira noite de uso.
              </p>
            </div>

            {/* Preço */}
            <div className="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-4 sm:p-5">
              <div className="flex items-baseline gap-3">
                <span className="text-sm line-through text-slate-400 font-medium">
                  De R$ 249,90
                </span>
                <span className="text-3xl sm:text-4xl font-black text-slate-900">
                  R$ {precoTotal}
                </span>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded-full">
                  Economize R$ 130,00
                </span>
              </div>
              <p className="text-xs text-indigo-900 font-medium mt-1">
                em até <strong>12x de R$ {parcela}</strong> no cartão ou à vista no Pix com 5% de desconto extra.
              </p>
            </div>

            {/* Seleção de Tamanho */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Tamanho Ergonômico:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setTamanho("padrao")}
                  className={`py-2.5 px-3 rounded-xl border text-left transition ${
                    tamanho === "padrao"
                      ? "border-indigo-600 bg-indigo-50/50 text-indigo-950 font-bold ring-2 ring-indigo-500/20"
                      : "border-slate-200 bg-white text-slate-700"
                  }`}
                >
                  <div className="text-xs font-bold">Padrão Ortopédico</div>
                  <div className="text-[10px] text-slate-500">50cm x 30cm x 10cm</div>
                </button>
                <button
                  type="button"
                  onClick={() => setTamanho("king")}
                  className={`py-2.5 px-3 rounded-xl border text-left transition ${
                    tamanho === "king"
                      ? "border-indigo-600 bg-indigo-50/50 text-indigo-950 font-bold ring-2 ring-indigo-500/20"
                      : "border-slate-200 bg-white text-slate-700"
                  }`}
                >
                  <div className="text-xs font-bold">King Size Ortopédico</div>
                  <div className="text-[10px] text-slate-500">60cm x 40cm x 12cm</div>
                </button>
              </div>
            </div>

            {/* Quantidade */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Quantidade de Travesseiros:
              </label>
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center border border-slate-300 rounded-xl bg-white shadow-xs">
                  <button
                    type="button"
                    onClick={() => setQuantidade(Math.max(1, quantidade - 1))}
                    className="w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-slate-100 font-bold text-lg rounded-l-xl"
                  >
                    -
                  </button>
                  <span className="w-12 text-center text-sm font-bold text-slate-900">
                    {quantidade}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantidade(quantidade + 1)}
                    className="w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-slate-100 font-bold text-lg rounded-r-xl"
                  >
                    +
                  </button>
                </div>
                {quantidade > 1 && (
                  <span className="text-xs text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg">
                    Desconto de kit aplicado!
                  </span>
                )}
              </div>
            </div>

            {/* Botão de Compra */}
            <div id="comprar" className="space-y-3 pt-2">
              <button
                type="button"
                onClick={() => alert("Produto adicionado com sucesso! Redirecionando para o checkout seguro...")}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base sm:text-lg py-4 px-6 rounded-2xl shadow-lg shadow-emerald-600/30 transition transform active:scale-[0.99] flex items-center justify-center gap-3"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>COMPRAR AGORA COM FRETE GRÁTIS</span>
              </button>

              <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-500 pt-1">
                <span className="flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-emerald-600" /> Compra 100% Criptografada
                </span>
                <span className="flex items-center gap-1">
                  <RotateCcw className="w-3.5 h-3.5 text-indigo-600" /> 30 Dias de Garantia
                </span>
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-emerald-600" /> Envio Expresso Correios
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Seção de Benefícios */}
        <section id="beneficios" className="mt-20 pt-10 border-t border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
              Engenharia Ortopédica
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
              Por que 98% dos clientes nunca mais trocam de travesseiro?
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              A combinação perfeita entre sustentação cervical precisa e o toque macio
              da nuvem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <HeartPulse className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-slate-900">
                Alinhamento Cervical Instantâneo
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                O contorno anatômico acomoda a curva natural da coluna, desobstruindo as
                vias aéreas e aliviando a tensão acumulada na nuca e ombros durante o dia.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-slate-900">
                Espuma Viscoelástica de Alta Densidade
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Desenvolvida com a tecnologia de memória espacial que se molda aos contornos
                exatos da sua cabeça sem nunca deformar ou afundar com o tempo.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-slate-900">
                Capa de Bambu Termorreguladora
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tecido hipoalergênico e antibacteriano com microfuros de ventilação contínua.
                Não retém calor, previne odores e pode ser retirada facilmente para lavar.
              </p>
            </div>
          </div>
        </section>

        {/* Tabela de Comparação */}
        <section className="mt-16 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 text-center mb-6">
            SonoNuvem® vs Travesseiro Comum de Fibra
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-bold">
                  <th className="py-3 px-4">Característica</th>
                  <th className="py-3 px-4 text-indigo-700 bg-indigo-50/50 rounded-t-xl">
                    SonoNuvem® Ortopédico
                  </th>
                  <th className="py-3 px-4 text-slate-600">Travesseiro Comum</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-700">
                    Sustentação da Coluna Cervical
                  </td>
                  <td className="py-3 px-4 font-bold text-emerald-600 bg-indigo-50/30">
                    ✓ Anatômica e calibrada
                  </td>
                  <td className="py-3 px-4 text-slate-400">✗ Afunda ou dobra</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-700">
                    Durabilidade sem Deformar
                  </td>
                  <td className="py-3 px-4 font-bold text-emerald-600 bg-indigo-50/30">
                    ✓ Até 5 anos intacto
                  </td>
                  <td className="py-3 px-4 text-slate-400">✗ Deforma em 3 meses</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-700">
                    Tecnologia Anti-Calor / Respiração
                  </td>
                  <td className="py-3 px-4 font-bold text-emerald-600 bg-indigo-50/30">
                    ✓ Canais de ar + Gel
                  </td>
                  <td className="py-3 px-4 text-slate-400">✗ Esquenta e sua</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-700">
                    Garantia de 30 Noites sem Risco
                  </td>
                  <td className="py-3 px-4 font-bold text-emerald-600 bg-indigo-50/30">
                    ✓ Teste sem compromisso
                  </td>
                  <td className="py-3 px-4 text-slate-400">✗ Sem garantia</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Depoimentos */}
        <section id="avaliacoes" className="mt-20">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-2xl font-extrabold text-slate-900">
              O que dizem quem já testou
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Avaliações reais de clientes verificados em todo o território nacional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <p className="text-xs text-slate-700 italic">
                &ldquo;Acordava todos os dias com dor de cabeça e torcicolo. No terceiro dia de
                uso com o SonoNuvem as dores simplesmente sumiram. Melhor compra do ano!&rdquo;
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900">Mariana Silveira</div>
                  <div className="text-[10px] text-slate-400">São Paulo, SP</div>
                </div>
                <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Compra Verificada
                </span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <p className="text-xs text-slate-700 italic">
                &ldquo;Meu ortopedista recomendou um travesseiro de densidade média com curva
                cervical. Esse atendeu perfeitamente e o frete chegou em 4 dias em Curitiba.&rdquo;
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900">Carlos Alberto Ribeiro</div>
                  <div className="text-[10px] text-slate-400">Curitiba, PR</div>
                </div>
                <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Compra Verificada
                </span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <p className="text-xs text-slate-700 italic">
                &ldquo;O tecido não esquenta nada à noite, é impressionante. Comprei 2 no kit e
                dei um para o meu marido, parou até de roncar alto.&rdquo;
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900">Fernanda Prado</div>
                  <div className="text-[10px] text-slate-400">Belo Horizonte, MG</div>
                </div>
                <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Compra Verificada
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Accordion */}
        <section id="faq" className="mt-20 max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-extrabold text-slate-900">Perguntas Frequentes</h2>
            <p className="text-xs text-slate-500 mt-1">Tire todas as suas dúvidas sobre a compra.</p>
          </div>

          <div className="space-y-3">
            {[
              {
                p: "Como funciona a garantia incondicional de 30 noites de teste?",
                r: "Você tem 30 noites completas a partir da entrega para dormir com o SonoNuvem®. Se por qualquer motivo não sentir alívio das dores ou não se adaptar, basta entrar em contato com nosso suporte que devolvemos 100% do seu dinheiro sem burocracia.",
              },
              {
                p: "Qual o prazo de entrega para a minha região?",
                r: "Os envios são despachados em até 24h úteis via Correios com código de rastreamento. Para Capitais e Sudeste: 3 a 6 dias úteis. Demais regiões: 5 a 10 dias úteis.",
              },
              {
                p: "O travesseiro serve para quem dorme de lado ou de costas?",
                r: "Sim! Ele foi desenvolvido com dupla altura anatômica: o lado mais alto (10cm a 12cm) é ideal para quem dorme de lado mantendo os ombros livres, e o lado anatômico central é perfeito para quem dorme de costas ou de bruços.",
              },
              {
                p: "A capa é lavável?",
                r: "Sim, a capa externa de fibra de bambu possui zíper invisível e pode ser lavada normalmente na máquina de lavar roupas.",
              },
            ].map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full py-4 px-5 text-left font-bold text-xs sm:text-sm text-slate-900 flex items-center justify-between hover:bg-slate-50 transition"
                >
                  <span>{faq.p}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                      faqAberto === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {faqAberto === idx && (
                  <div className="px-5 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.r}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-slate-200 bg-white py-10 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                S
              </div>
              <span className="font-bold text-slate-900">SonoNuvem Brasil</span>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-[11px] font-medium text-slate-600">
              <a href="#" className="hover:underline">
                Termos de Uso
              </a>
              <a href="#" className="hover:underline">
                Políticas de Privacidade
              </a>
              <a href="#" className="hover:underline">
                Trocas e Devoluções
              </a>
              <a href="#" className="hover:underline">
                Rastrear Pedido
              </a>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-6 text-center text-[10px] text-slate-400 space-y-1">
            <p>
              SonoNuvem Comércio de Artigos de Cama e Ortopedia Ltda. • CNPJ: 48.912.304/0001-92
            </p>
            <p>
              Av. Paulista, 1754 - Bela Vista, São Paulo - SP, 01310-920 • Atendimento:
              suporte@sononuvem.com.br
            </p>
            <p className="pt-2">
              © {new Date().getFullYear()} SonoNuvem Brasil. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
