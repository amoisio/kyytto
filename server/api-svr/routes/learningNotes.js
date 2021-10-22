const R = require('ramda');

exports.getLearningNotes = R.curry((getLearningNotes, request, response, next) => {
    const lb = response.linkBuilder;
    
    getLearningNotes()
    .then(results => {
        const dto = {
            href: lb.addSegment('learning').toString(),
            rel: '/learning',
            notes: R.map(r => {
                return {
                    id: lb.addSegment(r.id).toString(),
                    topic: r.topic,
                    
                    createdBy: r.createdBy,
                    createdOn: r.createdOn,
                    modifiedOn: r.modifiedOn
                }
            }, results.items)
        };

        response.json(response.representationBuilder(dto));
    });
});

// exports.postBug = R.curry((saveBug, req, res, next) => {
//     saveBug(req.body)
//     .then(() => {
//         res.status(200).send();
//     })
//     .catch(e => {
//         console.error(e);
//         res.status(500).send(e.toString());
//     });
// });
