const { initTRPC } = require('@trpc/server');

const t = initTRPC.create();

const appRouter = t.router({
  letters: t.procedure.query(async ({ ctx }) => {
    const rows = await ctx.prisma.letter.findMany({
      orderBy: { id: 'asc' },
    });

    return rows.map((row) => row.value);
  }),
});

module.exports = {
  appRouter,
};
